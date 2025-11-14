import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { slugify } from '@/lib/slug';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const projectsRef = collection(db, 'projects');
    const snapshot = await getDocs(projectsRef);

    let foundProject: any = null;

    snapshot.forEach((docSnap) => {
      if (foundProject) return;
      const data = docSnap.data() as any;
      const computedSlug = (data.slug as string) || slugify(data.title || '');

      if (computedSlug === slug) {
        foundProject = {
          id: docSnap.id,
          ...data,
          created_at:
            data.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
          updated_at:
            data.updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
        };
      }
    });

    if (!foundProject) {
      return NextResponse.json({ error: 'Projekt nenalezen' }, { status: 404 });
    }

    return NextResponse.json(foundProject);
  } catch (err) {
    console.error('Chyba při načítání projektu podle slugu:', err);
    return NextResponse.json({ error: 'Chyba při načítání projektu' }, { status: 500 });
  }
}

