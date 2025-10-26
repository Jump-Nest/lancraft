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
    const supabase = getSupabaseClient();
    const { id } = await params;
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return NextResponse.json({ error: 'Projekt nenalezen' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Chyba při načítání projektu' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    checkAuth(request);
    const supabase = getSupabaseClient();
    const { id } = await params;
    const { title, description, image, category } = await request.json();

    const { data, error } = await supabase
      .from('projects')
      .update({ title, description, image, category, updated_at: new Date() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
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
    const supabase = getSupabaseClient();
    const { id } = await params;

    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    const message = err.message === 'Neautorizováno' ? 'Neautorizováno' : 'Chyba při mazání';
    const status = err.message === 'Neautorizováno' ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}