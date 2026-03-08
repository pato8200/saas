import { NextRequest, NextResponse } from 'next/server';
import { gerarTreinoLocal } from '../../../../services/local-ai';
import { AnamneseFormData } from '../../../../types/anamnese';

export async function POST(req: NextRequest) {
  try {
    const body: AnamneseFormData = await req.json();
    
    // Validar campos obrigatórios
    if (!body.nome || !body.peso || !body.altura || !body.categoria) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes' },
        { status: 400 }
      );
    }

    console.log('🧠 Generating workout with LOCAL AI (NO API NEEDED!)');
    console.log('⚡ Speed: Instant (<1 second)');
    console.log('👤 User:', body.nome, '| Objective:', body.categoria, '| Level:', body.nivel);
    
    // Generate workout using LOCAL AI - no external dependencies!
    const treino = await gerarTreinoLocal(body);
    
    console.log('✅ Workout generated INSTANTLY with local AI!');
    console.log('📊 Weeks:', treino.semanas?.length, '| Days/Week:', treino.semanas?.[0]?.divisaoSemanal?.length);

    return NextResponse.json({ success: true, treino });
  } catch (error) {
    console.error('Erro ao gerar treino:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar plano de treino: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}