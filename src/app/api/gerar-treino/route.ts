import { NextRequest, NextResponse } from 'next/server';
import { gerarTreinoLocal } from '../../../../services/local-ai';
import { AnamneseFormData } from '../../../../types/anamnese';

export async function POST(req: NextRequest) {
  try {
    const body: AnamneseFormData = await req.json();
    
    console.log('📥 Received form data:', JSON.stringify(body, null, 2));
    
    // Validate required fields with better error messages
    const missingFields = [];
    if (!body.nome) missingFields.push('nome');
    if (!body.peso) missingFields.push('peso');
    if (!body.altura) missingFields.push('altura');
    if (!body.categoria) missingFields.push('categoria');
    
    if (missingFields.length > 0) {
      console.error('❌ Missing required fields:', missingFields);
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          missingFields,
          receivedData: body
        },
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
    console.error('❌ Error generating workout:', error);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        error: 'Failed to generate workout plan',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: 'Check server logs for more information'
      },
      { status: 500 }
    );
  }
}