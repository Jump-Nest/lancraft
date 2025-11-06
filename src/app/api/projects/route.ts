import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, orderBy, Timestamp } from 'firebase/firestore';

export async function GET() {
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);

    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Převést Firestore Timestamp na ISO string pro kompatibilitu
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
    }));

    return NextResponse.json(projects);
  } catch (err) {
    console.error('Chyba při načítání projektů:', err);
    return NextResponse.json({ error: 'Chyba při načítání projektů' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ověření přístupu - dekóduj token a porovnej s heslem
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (!token || !ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Neautorizováno' }, { status: 401 });
    }

    const decodedPassword = Buffer.from(token, 'base64').toString();
    if (decodedPassword !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Neautorizováno' }, { status: 401 });
    }

    const { title, description, image, category, thumbnail_image, article_image, preview_text } = await request.json();

    if (!title || !description || !category) {
      return NextResponse.json({ error: 'Chybí požadovaná pole' }, { status: 400 });
    }

    const projectsRef = collection(db, 'projects');
    const now = Timestamp.now();

    const docRef = await addDoc(projectsRef, {
      title,
      description,
      image: image || null,
      category,
      thumbnail_image: thumbnail_image || null,
      article_image: article_image || null,
      preview_text: preview_text || null,
      created_at: now,
      updated_at: now,
    });

    // Vrátit vytvořený projekt s ID
    const newProject = {
      id: docRef.id,
      title,
      description,
      image,
      category,
      thumbnail_image,
      article_image,
      preview_text,
      created_at: now.toDate().toISOString(),
      updated_at: now.toDate().toISOString(),
    };

    return NextResponse.json(newProject, { status: 201 });
  } catch (err) {
    console.error('Chyba při vytváření projektu:', err);
    return NextResponse.json({ error: 'Chyba při vytváření projektu' }, { status: 500 });
  }
}