import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';

function checkAuth(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!token || !ADMIN_PASSWORD) {
    throw new Error('Neautorizováno');
  }

  const decodedPassword = Buffer.from(token, 'base64').toString();
  if (decodedPassword !== ADMIN_PASSWORD) {
    throw new Error('Neautorizováno');
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const docRef = doc(db, 'projects', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Projekt nenalezen' }, { status: 404 });
    }

    const project = {
      id: docSnap.id,
      ...docSnap.data(),
      created_at: docSnap.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: docSnap.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
    };

    return NextResponse.json(project);
  } catch (err) {
    console.error('Chyba při načítání projektu:', err);
    return NextResponse.json({ error: 'Chyba při načítání projektu' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    checkAuth(request);
    const { id } = await params;
    const { title, description, image, category, thumbnail_image, article_image, preview_text, youtube_url, instagram_url, twitch_url } = await request.json();

    const docRef = doc(db, 'projects', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Projekt nenalezen' }, { status: 404 });
    }

    const updateData = {
      title,
      description,
      image: image || null,
      category,
      thumbnail_image: thumbnail_image || null,
      article_image: article_image || null,
      preview_text: preview_text || null,
      youtube_url: youtube_url || null,
      instagram_url: instagram_url || null,
      twitch_url: twitch_url || null,
      updated_at: Timestamp.now(),
    };

    await updateDoc(docRef, updateData);

    // Vrátit aktualizovaný projekt
    const updatedProject = {
      id,
      ...updateData,
      created_at: docSnap.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: updateData.updated_at.toDate().toISOString(),
    };

    return NextResponse.json(updatedProject);
  } catch (err: any) {
    console.error('Chyba při aktualizaci projektu:', err);
    const message = err.message === 'Neautorizováno' ? 'Neautorizováno' : 'Chyba při aktualizaci';
    const status = err.message === 'Neautorizováno' ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    checkAuth(request);
    const { id } = await params;

    const docRef = doc(db, 'projects', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Projekt nenalezen' }, { status: 404 });
    }

    await deleteDoc(docRef);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Chyba při mazání projektu:', err);
    const message = err.message === 'Neautorizováno' ? 'Neautorizováno' : 'Chyba při mazání';
    const status = err.message === 'Neautorizováno' ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}