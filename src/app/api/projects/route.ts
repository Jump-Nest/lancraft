import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Chybí Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
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

    const { title, description, image, category } = await request.json();

    if (!title || !description || !category) {
      return NextResponse.json({ error: 'Chybí požadovaná pole' }, { status: 400 });
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('projects')
      .insert([{ title, description, image, category }])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Chyba při vytváření projektu' }, { status: 500 });
  }
}