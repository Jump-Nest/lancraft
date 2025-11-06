import { NextRequest, NextResponse } from 'next/server';
import { adminStorage } from '@/lib/firebase-admin';

// Ověřit token
function verifyToken(token: string): boolean {
  try {
    if (!token.startsWith('Bearer ')) {
      console.log('Token does not start with Bearer');
      return false;
    }
    const base64Token = token.substring(7);
    const decodedPassword = Buffer.from(base64Token, 'base64').toString('utf-8');
    console.log('Decoded password:', decodedPassword);
    console.log('ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD);
    const isValid = decodedPassword === process.env.ADMIN_PASSWORD;
    console.log('Token valid:', isValid);
    return isValid;
  } catch (err) {
    console.log('Token verification error:', err);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ověřit autentifikaci
    const authHeader = request.headers.get('Authorization');
    console.log('Auth header:', authHeader);
    console.log('Verify result:', verifyToken(authHeader || ''));

    if (!authHeader || !verifyToken(authHeader)) {
      console.log('Authorization failed. Header:', authHeader);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Přečíst FormData
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Chybí soubor' }, { status: 400 });
    }

    // Ověřit typ souboru
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Soubor musí být obrázek' }, { status: 400 });
    }

    // Ověřit velikost (max 5MB - měl by být menší po kompresi)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Soubor je příliš velký' }, { status: 400 });
    }

    // Převést na Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExt = file.type.split('/')[1] || 'jpg';
    const fileName = `project-images/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    // Nahrát do Firebase Storage pomocí Admin SDK
    const bucket = adminStorage.bucket();
    const fileRef = bucket.file(fileName);

    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
        cacheControl: 'public, max-age=3600',
      },
    });

    // Nastavit soubor jako veřejně přístupný
    await fileRef.makePublic();

    // Získat veřejnou URL
    const downloadURL = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    return NextResponse.json({ url: downloadURL });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: `Chyba při nahrávání: ${error.message || 'Neznámá chyba'}` },
      { status: 500 }
    );
  }
}