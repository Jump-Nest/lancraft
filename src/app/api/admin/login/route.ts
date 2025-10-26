import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // Ověřte heslo - musí být v .env.local
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    
    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Server není správně nakonfigurován' }, { status: 500 });
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Nesprávné heslo' }, { status: 401 });
    }

    // Vygeneruj token (base64 encoded heslo)
    const token = Buffer.from(ADMIN_PASSWORD).toString('base64');

    return NextResponse.json({ 
      token,
      message: 'Přihlášení úspěšné' 
    }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Chyba při přihlášení' }, { status: 500 });
  }
}