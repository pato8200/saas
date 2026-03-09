import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { TreinoData, AnamneseFormData } from '../types/anamnese';

interface PdfTreinoProps {
  workoutPlan: TreinoData;
  anamneseData: AnamneseFormData & { categoria?: string };
}

const PdfTreino: React.FC<PdfTreinoProps> = ({ workoutPlan, anamneseData }) => {
  const styles = StyleSheet.create({
    // Cores e estilo base
    page: {
      backgroundColor: '#FFFFFF',
      padding: 40,
    },
    
    // Capa
    coverPage: {
      padding: 50,
      backgroundColor: '#FFFFFF',
    },
    topBar: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      height: 8,
      backgroundColor: '#FFD700',
    },
    orangeAccent: {
      position: 'absolute' as const,
      top: 0,
      right: 0,
      width: 150,
      height: 150,
      backgroundColor: '#FF8C00',
      opacity: 0.1,
    },
    badge: {
      backgroundColor: '#FFD700',
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 20,
      marginBottom: 30,
      alignSelf: 'center' as const,
    },
    badgeText: {
      fontSize: 10,
      fontWeight: '700',
      color: '#000000',
      textTransform: 'uppercase' as const,
      letterSpacing: 2,
    },
    title: {
      fontSize: 36,
      fontWeight: '900',
      color: '#FF8C00',
      marginBottom: 10,
      textAlign: 'center' as const,
    },
    subtitle: {
      fontSize: 12,
      color: '#666666',
      marginBottom: 40,
      textAlign: 'center' as const,
    },
    athleteBox: {
      backgroundColor: '#FFF9F0',
      borderLeftWidth: 4,
      borderLeftColor: '#FFD700',
      paddingVertical: 20,
      paddingHorizontal: 40,
      marginBottom: 30,
      alignItems: 'center' as const,
    },
    athleteName: {
      fontSize: 24,
      fontWeight: '700',
      color: '#1a1a1a',
    },
    infoRow: {
      flexDirection: 'row' as const,
      gap: 30,
      justifyContent: 'center' as const,
      marginTop: 20,
    },
    infoItem: {
      alignItems: 'center' as const,
    },
    infoValue: {
      fontSize: 16,
      fontWeight: '700',
      color: '#FFD700',
    },
    infoLabel: {
      fontSize: 9,
      color: '#999999',
      textTransform: 'uppercase' as const,
      marginTop: 4,
    },
    dotsRow: {
      flexDirection: 'row' as const,
      gap: 8,
      marginTop: 40,
      justifyContent: 'center' as const,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#FFD700',
    },
    dotActive: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#FF8C00',
    },
    
    // Páginas de treino
    workoutHeader: {
      marginBottom: 30,
      paddingBottom: 20,
      borderBottomWidth: 2,
      borderBottomColor: '#FFD700',
    },
    dayTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: '#FF8C00',
      marginBottom: 8,
    },
    dayLabel: {
      fontSize: 11,
      color: '#999999',
      textTransform: 'uppercase' as const,
      letterSpacing: 2,
    },
    progressBar: {
      height: 4,
      backgroundColor: '#FFF9F0',
      borderRadius: 2,
      marginTop: 15,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#FFD700',
    },
    exerciseItem: {
      marginBottom: 25,
      paddingBottom: 25,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    exerciseHeader: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      marginBottom: 10,
    },
    exerciseNumber: {
      fontSize: 18,
      fontWeight: '700',
      color: '#FFD700',
      marginRight: 12,
      minWidth: 30,
    },
    exerciseName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1a1a1a',
      flex: 1,
    },
    exerciseDetails: {
      flexDirection: 'row' as const,
      backgroundColor: '#FFF9F0',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 6,
      marginBottom: 10,
    },
    detailBox: {
      alignItems: 'center' as const,
      flex: 1,
    },
    detailValue: {
      fontSize: 13,
      fontWeight: '700',
      color: '#FF8C00',
    },
    detailLabel: {
      fontSize: 9,
      color: '#999999',
      textTransform: 'uppercase' as const,
      marginTop: 3,
    },
    detailSeparator: {
      width: 1,
      backgroundColor: '#FFD700',
      marginHorizontal: 10,
    },
    expertTip: {
      backgroundColor: '#FFFBF0',
      borderLeftWidth: 3,
      borderLeftColor: '#FF8C00',
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginTop: 8,
    },
    expertTipText: {
      fontSize: 10,
      color: '#666666',
      lineHeight: 1.6,
      fontStyle: 'italic',
    },
    footerNote: {
      fontSize: 9,
      color: '#CCCCCC',
      textAlign: 'center' as const,
      marginTop: 30,
    },
    
    // Página final
    guidePage: {
      padding: 50,
      backgroundColor: '#FFFFFF',
    },
    guideTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: '#FF8C00',
      marginBottom: 30,
      textAlign: 'center' as const,
    },
    stepContainer: {
      flexDirection: 'row' as const,
      marginBottom: 25,
      alignItems: 'flex-start' as const,
    },
    stepNumber: {
      fontSize: 24,
      fontWeight: '900',
      color: '#FFD700',
      marginRight: 15,
      minWidth: 40,
    },
    stepContent: {
      flex: 1,
    },
    stepTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: '#1a1a1a',
      marginBottom: 6,
    },
    stepDescription: {
      fontSize: 11,
      color: '#666666',
      lineHeight: 1.6,
    },
    infoBox: {
      backgroundColor: '#FFF9F0',
      borderLeftWidth: 4,
      borderLeftColor: '#FFD700',
      padding: 15,
      marginBottom: 20,
      borderRadius: 6,
    },
    infoBoxTitle: {
      fontSize: 12,
      fontWeight: '700',
      color: '#FF8C00',
      marginBottom: 8,
      textTransform: 'uppercase' as const,
    },
    infoBoxText: {
      fontSize: 11,
      color: '#666666',
      lineHeight: 1.6,
    },
    warningBox: {
      backgroundColor: '#FEF2F2',
      borderLeftWidth: 4,
      borderLeftColor: '#DC2626',
      padding: 15,
      marginTop: 30,
      borderRadius: 6,
    },
    warningTitle: {
      fontSize: 12,
      fontWeight: '700',
      color: '#DC2626',
      marginBottom: 8,
      textTransform: 'uppercase' as const,
    },
    warningText: {
      fontSize: 10,
      color: '#991B1B',
      lineHeight: 1.6,
    },
    pageNumber: {
      position: 'absolute' as const,
      bottom: 30,
      right: 50,
      fontSize: 10,
      color: '#CCCCCC',
    },
  });

  // Pegar apenas os primeiros 7 dias
  const allTrainingDays: Array<{
    dia: { dia: string; exercicios: any[] };
  }> = [];

  if (workoutPlan.semanas && workoutPlan.semanas.length > 0) {
    workoutPlan.semanas[0].divisaoSemanal?.forEach((dia) => {
      if (dia && dia.exercicios && Array.isArray(dia.exercicios)) {
        allTrainingDays.push({ dia });
      }
    });
  }

  const sevenDays = allTrainingDays.slice(0, 7);

  // Use age directly from form data (form collects age, not birth date)
  const getAge = () => {
    return anamneseData.idade || 25;
  };

  // Translate exercise tips from Portuguese to English
  const translateTip = (tip: string): string => {
    const translations: Record<string, string> = {
      // Core/Abs exercises
      'Contraia gluteos e abdomen fortemente': 'Contract glutes and abs hard',
      'Nao deixe quadril cair ou subir demais': "Don't let hips drop or rise too much",
      'Lying down, levante pernas e tronco formando V': 'Lying down, lift legs and torso forming V',
      'Segure haltere se necessario': 'Hold dumbbell if needed',
      'Lying down, pernas estendidas': 'Lying down, legs extended',
      'Eleve ate 90 sem descolar lombar do chao': 'Lift to 90 without lifting lower back from floor',
      'Desca lentamente': 'Lower slowly',
      'Lying down, joelhos 90': 'Lying down, knees at 90',
      'Eleve quadril do chao usando abdominal inferior': 'Lift hips from floor using lower abs',
      'Control the descent': 'Control the descent',
      'Lying down, abra bracos e pernas formando X': 'Lying down, open arms and legs forming X',
      'Feche trazendo maos aos pes contraindo abdomen': 'Close bringing hands to feet contracting abs',
      'Posicao de plank': 'Plank position',
      'traga joelhos alternadamente em direcao ao peito': 'bring knees alternately toward chest',
      'Rapido e controlado': 'Fast and controlled',
      'Lying down, joelhos flexionados': 'Lying down, knees bent',
      'Eleve tronco contraindo abdomen superior': 'Lift torso contracting upper abs',
      'Segure 1s no topo': 'Hold 1s at top',
      'Pendurado na barra': 'Hanging from bar',
      'suba joelhos em direcao ao peito': 'lift knees toward chest',
      'Nao balance o corpo': "Don't swing body",
      'Lying down, levante pernas e tronco simultaneamente': 'Lying down, lift legs and torso simultaneously',
      'tentando tocar os pes': 'trying to touch feet',
      'Pes elevados': 'Feet elevated',
      'gire tronco tocando chao cada lado': 'rotate torso touching floor each side',
      'Olhe sempre para as maos durante movimento': 'Always look at hands during movement',
      'Posicao de plank, corra trazendo joelhos ao peito': 'Plank position, run bringing knees to chest',
      'Core contraido': 'Core engaged',
      'Lying down, levante pernas e ombros do chao': 'Lying down, lift legs and shoulders off floor',
      'Lombar pressionada no chao': 'Lower back pressed to floor',
      'Posicao de banana': 'Banana position',
      'Estenda braco e perna opostos simultaneamente': 'Extend opposite arm and leg simultaneously',
      'com controle': 'with control',
      'Posicao de plank alta': 'High plank position',
      'toque ombro oposto alternadamente': 'touch opposite shoulder alternately',
      'Mantenha quadril estavel': 'Keep hips stable',
      'Apoie antebraco e lateral do pe': 'Support forearm and side of foot',
      'Quadril alto': 'Hips high',
      'corpo alinhado': 'body aligned',
      'Foque em obliquos': 'Focus on obliques',
      'Sentado': 'Sitting',
      'Lean torso 45': 'Lean torso 45',
      'Gire medicine ball ou haltere': 'Rotate medicine ball or dumbbell',
      'de um lado para outro': 'from side to side',
      'Pes abrem e fecham': 'Feet open and close',
      'bracos sobem e descem': 'arms go up and down',
      'Ritmo constante': 'Constant rhythm',
      'respiracao controlada': 'controlled breathing',
      'nao atras do pescoco': 'not behind neck',
      'COTOVELOS BAIXOS': 'ELBOWS DOWN',
      'INCLINE TRONCO 15 para TRAS': 'LEAN TORSO BACK 15',
      'CONTRAIA DORSAIS': 'CONTRACT LATS',
      'POLIA ALTA com CORDA': 'HIGH PULLEY with ROPE',
      'Puxe em direcao a TESTA': 'Pull toward FOREHEAD',
      'ABRINDO COTOVELOS': 'OPENING ELBOWS',
      'ROTACAO EXTERNA': 'EXTERNAL ROTATION',
      'FOQUE em DELTOIDE POSTERIOR': 'FOCUS on REAR DELTOID',
      'TRAPEZIO INFERIOR': 'LOWER TRAPEZIUS',
      'Cotovelos colados no corpo': 'Elbows glued to body',
      'Suba contraindo biceps fortemente': 'Rise contracting biceps hard',
      'desca controlando por 3 segundos': 'lower controlling for 3 seconds',
      'Cotovelo apoiado na coxa': 'Elbow supported on thigh',
      'Foque em pico de contracao': 'Focus on peak contraction',
      'Movimento lento e controlado': 'Slow and controlled movement',
      'BARRA FIXA no CHAO': 'BAR FIXED on GROUND',
      'Pegue em direcao ao PEITO': 'Pull toward CHEST',
      'COTOVELOS ALTOS': 'ELBOWS HIGH',
      'CONTRAIA MEIO DAS COSTAS': 'CONTRACT MID-BACK',
      'Knees go forward': 'Knees go forward',
      'hips back': 'hips back',
      'Torso leans back': 'Torso leans back',
      'Fully stretches rectus femoris': 'Fully stretches rectus femoris',
      'Use support if needed': 'Use support if needed',
      'Extreme quad isolation': 'Extreme quad isolation',
      'Joelhos levemente flexionados': 'Knees slightly bent',
      'desca barra rente as pernas': 'lower bar close to legs',
      'Sinta alongar posterior': 'Feel hamstring stretch',
      'Volta contraindo gluteos': 'Return contracting glutes',
      'Barra nas costas': 'Bar on back',
      'tronco a 45 graus': 'torso at 45 degrees',
      'Desca quadril para tras': 'Lower hips back',
      'Wide stride': 'Wide stride',
      'Lower vertically': 'Lower vertically',
      'Back knee almost touches floor': 'Back knee almost touches floor',
      'Keep torso upright': 'Keep torso upright',
      'core engaged': 'core engaged',
      'Incline tronco 45': 'Lean torso 45',
      'Bracos estendidos': 'Arms extended',
      'abra lateralmente': 'open laterally',
      'Foque em CONTRAIR posterior de ombro': 'Focus on CONTRACTING rear shoulder',
      'NAO use trapezio': 'DO NOT use trapezius',
      'Suba barra ate ALTURA DOS OLHOS': 'Raise bar to EYE LEVEL',
      'NAO use impulso': 'DO NOT use momentum',
      'Polegares para cima': 'Thumbs up',
      'Nao balance tronco': 'Do not swing torso',
      'Contraia biceps no topo': 'Contract biceps at top',
      'Supino RETO com PEGADA FECHADA': 'FLAT Bench with CLOSE GRIP',
      'DESCER ate PEITO': 'LOWER to CHEST',
      'COTOVELOS RENTOS ao corpo': 'ELBOWS CLOSE to body',
      'EMPURRAR EXPLODINDO': 'PUSH EXPLODING',
      'COMPOSTO PESADO para TRICEPS': 'HEAVY COMPOUND for TRICEPS',
      'Maos apoiadas em BANCO': 'Hands supported on BENCH',
      'PES NO CHAO': 'FEET ON FLOOR',
      'iniciante': 'beginner',
      'ou ESTICADOS': 'or STRETCHED',
      'avancado': 'advanced',
      'Desca QUADRIL PROXIMO ao chao': 'Lower HIPS CLOSE to floor',
      'SUBA contraindo TRICEPS': 'RISE contracting TRICEPS',
      'Pes mais afastados': 'Feet wider apart',
      'pontas para fora': 'toes out',
      'Desca ate paralelo ou abaixo': 'Descend to parallel or below',
      'Passada ampla': 'Wide step',
      'desca joelho de tras': 'lower back knee',
      'quase ate tocar chao': 'almost to touch floor',
      'Tronco ereto': 'Upright torso',
      'Deitado': 'Lying down',
      'puxe calcanhares': 'pull heels',
      'em direcao aos gluteos': 'toward glutes',
      'Segure 1 segundo': 'Hold 1 second',
      'contracao maxima': 'maximum contraction',
      'Movimento de quadril': 'Hip movement',
      'nao de bracos': 'not arms',
      'Estenda tudo no topo': 'Extend everything at top',
      'Kettlebell flutua': 'Kettlebell floats',
      'altura dos ombros': 'shoulder height',
      'Use tornozelheira': 'Use ankle strap',
      'Chute para tras': 'Kick backward',
      'contraindo gluteo maximo': 'contracting glute maximus',
      'Tronco estavel': 'Stable torso',
      'Banco 30-45': 'Bench 30-45',
      'Foco em PEITORAL SUPERIOR': 'Focus on UPPER CHEST',
      'Desca halteres': 'Lower dumbbells',
      'ate altura do peito': 'to chest height',
      'Rotacao externa no topo': 'External rotation at top',
      'Maos largura dos ombros': 'Hands shoulder width',
      'Corpo RETO': 'Body STRAIGHT',
      'prancha': 'plank',
      'Desca ate peito quase tocar chao': 'Lower until chest almost touches floor',
      'Contraia gluteos e core': 'Contract glutes and core',
      'PEGADA PRONADA': 'PRONATED GRIP',
      'palmas para FRENTE': 'palms FORWARD',
      'LARGURA DOS OMBROS': 'SHOULDER WIDTH',
      'Puxe PEITO': 'Pull CHEST',
      'em direcao a BARRA': 'toward BAR',
      'COTOVELOS para BAIXO': 'ELBOWS DOWN',
      'e PARA TRAS': 'and BACK',
      'CONTRAIA DORSAIS no TOPO': 'CONTRACT LATS at TOP',
      'Feet shoulder-width apart': 'Feet shoulder-width apart',
      'on lower part of platform': 'on lower part of platform',
      'Descend controlled to 90': 'Descend controlled to 90',
      'no more': 'no more',
      'Don\'t lock knees': 'Don\'t lock knees',
      'at top': 'at top',
      'to maintain constant tension': 'to maintain constant tension',
      'Hold 1-2 seconds': 'Hold 1-2 seconds',
      'peak': 'peak',
      'Control descent for 3 seconds': 'Control descent for 3 seconds',
      'slow eccentric': 'slow eccentric',
      'Feet slightly out': 'Feet slightly out',
      'activates VMO': 'activates VMO',
      'vastus medialis': 'vastus medialis',
      'Bar resting on front delts': 'Bar resting on front delts',
      'hold with fingertips': 'hold with fingertips',
      'Elbows high': 'Elbows high',
      'Torso more upright': 'Torso more upright',
      'than traditional squat': 'than traditional squat',
      'Total focus on quads': 'Total focus on quads',
      'Keep chest up': 'Keep chest up',
      'descend to parallel or below': 'descend to parallel or below',
      'full ROM': 'full range of motion',
      'Knees aligned with toes': 'Knees aligned with toes',
      'don\'t let them cave in': 'don\'t let them cave in',
      'Push the floor away': 'Push the floor away',
      'on the way up': 'on the way up',
      'squeezing glutes': 'squeezing glutes',
      'MAXIMUM range': 'MAXIMUM range',
      'Lower heel': 'Lower heel',
      'until you feel full stretch': 'until you feel full stretch',
      'Rise contracting hard': 'Rise contracting hard',
      'Parallel feet': 'Parallel feet',
      'activate medial head': 'activate medial head',
      'Focus on SOLEUS': 'Focus on SOLEUS',
      'deep muscle': 'deep muscle',
      'Knees at 90': 'Knees at 90',
      'Pause 1s at bottom': 'Pause 1s at bottom',
      'Activates type I endurance fibers': 'Activates type I endurance fibers',
      'Feet on lower edge': 'Feet on lower edge',
      'Push extending knees completely': 'Push extending knees completely',
      'Hold contraction 2s': 'Hold contraction 2s',
      'Full ROM': 'Full range of motion',
      'Hold dumbbell on one side': 'Hold dumbbell on one side',
      'Support other leg': 'Support other leg',
      'Focus on maximum contraction': 'Focus on maximum contraction',
      'Corrects asymmetries': 'Corrects asymmetries',
      'Torso parallel to floor': 'Torso parallel to floor',
      'support on bench': 'support on bench',
      'Maximum stretch at bottom': 'Maximum stretch at bottom',
      'Emphasizes medial/lateral gastrocnemius': 'Emphasizes medial/lateral gastrocnemius',
      'Bar on traps': 'Bar on traps',
      'Use wooden blocks': 'Use wooden blocks',
      'under feet': 'under feet',
      'to increase range': 'to increase range',
      'Lower beyond line of feet': 'Lower beyond line of feet',
      'Use arms for momentum': 'Use arms for momentum',
      'Land softly': 'Land softly',
      'with knees slightly bent': 'with knees slightly bent',
      'Focus on maximum explosion': 'Focus on maximum explosion',
      'Box 60-90cm': 'Box 60-90cm',
      'Squat quickly': 'Squat quickly',
      'and jump as far as possible': 'and jump as far as possible',
      'Absorb impact': 'Absorb impact',
      'Walk back to reset': 'Walk back to reset',
      'Descend into squat': 'Descend into squat',
      'and EXPLODE up jumping': 'and EXPLODE up jumping',
      'Land softly and immediately': 'Land softly and immediately',
      'start next rep': 'start next rep',
      'Drop from box': 'Drop from box',
      'land and IMMEDIATELY jump max': 'land and IMMEDIATELY jump max',
      'Ground contact time': 'Ground contact time',
      'should be minimal': 'should be minimal',
      'Lift medicine ball above head': 'Lift medicine ball above head',
      'and throw to floor': 'and throw to floor',
      'with max force': 'with max force',
      'Squat to pick up': 'Squat to pick up',
      'and repeat': 'and repeat',
      'Feet shoulder width': 'Feet shoulder width',
      'Swing arms back': 'Swing arms back',
      'and jump forward max': 'and jump forward max',
      'Land with both feet': 'Land with both feet',
      'simultaneously': 'simultaneously',
    };
    
    let translated = tip;
    Object.keys(translations).forEach(key => {
      translated = translated.replace(new RegExp(key, 'gi'), translations[key]);
    });
    
    return translated;
  };

  // Translate exercise names from Portuguese to English
  const translateExerciseName = (name: string): string => {
    const translations: Record<string, string> = {
      // Core/Abs exercises
      'Prancha Abdominal': 'Plank',
      'Russian Twist': 'Russian Twist',
      'Dead Bug': 'Dead Bug',
      'Mountain Climber': 'Mountain Climber',
      'Abdominal Infra': 'Leg Raise',
      'Abdominal Remador': 'V-Tuck Crunch',
      'Bicicleta Abdominal': 'Bicycle Crunch',
      'Elevação de Joelhos Suspenso': 'Hanging Knee Raise',
      'Abdominal Canivete': 'Pike Crunch',
      'Prancha com Toque no Ombro': 'Plank Shoulder Tap',
      'Hollow Body Hold': 'Hollow Body Hold',
      'V-Up': 'V-Up',
      'Prancha Lateral': 'Side Plank',
      'Rotação Russa': 'Russian Twist',
      'Abdominal Reverso': 'Reverse Crunch',
      'Abdominal Supra': 'Crunch',
      'Escalador (Mountain Climber)': 'Mountain Climber',
      'Prancha Dinâmica': 'Dynamic Plank',
      'Leg Raise (Elevação de Pernas)': 'Leg Raise',
      'Crunch Inverso': 'Inverse Crunch',
      'Mountain Climbers': 'Mountain Climber',
      'Corrida Estacionária': 'Stationary Jog',
      'Polichinelos': 'Jumping Jacks',
      
      // Chest exercises
      'Supino Reto com Barra': 'Barbell Bench Press',
      'Supino Inclinado com Halteres': 'Incline Dumbbell Press',
      'Supino Declinado com Barra': 'Decline Barbell Press',
      'Crucifixo Inclinado': 'Incline Fly',
      'Crucifixo Reto': 'Flat Fly',
      'Flexão de Braço': 'Push-up',
      'Crossover Polia Alta': 'High Cable Crossover',
      'Peck Deck (Voador)': 'Pec Deck',
      'Pull-Over com Haltere': 'Dumbbell Pullover',
      'Flexão Diamante': 'Diamond Push-up',
      
      // Back exercises
      'Barra Fixa (Pull-Up)': 'Pull-up',
      'Puxada Alta (Lat Pulldown)': 'Lat Pulldown',
      'Remada Curvada com Barra': 'Bent-over Barbell Row',
      'Remada Curvada com Halteres (Ambas Mãos)': 'Bent-over Dumbbell Row',
      'Remada Unilateral com Haltere': 'One-arm Dumbbell Row',
      'Remada Cavalinho (Máquina)': 'Machine Row',
      'Remada Baixa Triângulo': 'Seated Cable Row',
      'Serrote (One-Arm Row)': 'One-arm Row',
      'T-Bar Row': 'T-Bar Row',
      'Face Pull (Posterior de Ombro/Trapézio)': 'Face Pull',
      
      // Shoulder exercises
      'Desenvolvimento Militar com Halteres': 'Seated Dumbbell Press',
      'Desenvolvimento Militar com Barra': 'Military Press',
      'Elevação Lateral': 'Lateral Raise',
      'Elevação Frontal com Barra': 'Barbell Front Raise',
      'Elevação Frontal com Halteres Alternada': 'Alternating Dumbbell Front Raise',
      'Desenvolvimento Arnold': 'Arnold Press',
      'Face Pull': 'Face Pull',
      'Crucifixo Inverso (Posterior)': 'Reverse Fly',
      'Remada Alta (Upright Row)': 'Upright Row',
      
      // Biceps exercises
      'Rosca Direta com Barra W': 'EZ Bar Curl',
      'Rosca Martelo Alternada': 'Alternating Hammer Curl',
      'Rosca Scott': 'Preacher Curl',
      'Rosca Concentrada': 'Concentration Curl',
      'Rosca 21': '21s Curl',
      
      // Triceps exercises
      'Tríceps Corda': 'Rope Tricep Pushdown',
      'Tríceps Testa': 'Skull Crusher',
      'Tríceps Francês': 'Overhead Tricep Extension',
      'Tríceps Banco (Dips)': 'Bench Dip',
      'Tríceps Polia Unilateral': 'Single-arm Cable Pushdown',
      'Skull Crusher (Barra Reta)': 'Skull Crusher',
      'Close-Grip Bench Press': 'Close-grip Bench Press',
      
      // Legs exercises
      'Barbell Back Squat': 'Barbell Back Squat',
      '45° Leg Press': '45° Leg Press',
      'Leg Extension': 'Leg Extension',
      'Bulgarian Split Squat': 'Bulgarian Split Squat',
      'Hack Squat': 'Hack Squat',
      'Dumbbell Walking Lunge': 'Walking Dumbbell Lunge',
      'Goblet Squat': 'Goblet Squat',
      'Front Squat': 'Front Squat',
      'Step-Up': 'Step-up',
      'Sissy Squat': 'Sissy Squat',
      
      // Calves exercises
      'Standing Calf Raise': 'Standing Calf Raise',
      'Seated Calf Raise': 'Seated Calf Raise',
      'Leg Press Calf Raise': 'Leg Press Calf Raise',
      'Single-Leg Calf Raise': 'Single-leg Calf Raise',
      'Donkey Calf Raise': 'Donkey Calf Raise',
      'Smith Machine Calf Raise': 'Smith Machine Calf Raise',
      
      // Hamstrings/Glutes
      'Stiff com Barra': 'Romanian Deadlift',
      'Mesa Flexora': 'Lying Leg Curl',
      'Cadeira Flexora': 'Seated Leg Curl',
      'Good Morning': 'Good Morning',
      'Swing com Kettlebell': 'Kettlebell Swing',
      'Elevação Pélvica (Hip Thrust)': 'Hip Thrust',
      'Agachamento Sumô': 'Sumo Squat',
      'Cadeira Abdutora': 'Hip Abductor Machine',
      'Avanço Caminhando': 'Walking Lunge',
      'Coice na Polia': 'Cable Kickback',
      
      // Plyometrics
      'Box Jump': 'Box Jump',
      'Broad Jump': 'Broad Jump',
      'Jump Squat': 'Jump Squat',
      'Depth Jump': 'Depth Jump',
      'Medicine Ball Slam': 'Medicine Ball Slam',
      'Horizontal Broad Jump': 'Standing Long Jump',
      'Burpees com Salto': 'Burpee Box Jump',
      'Skater Jumps': 'Skater Jump',
      'Tuck Jumps': 'Tuck Jump',
      'Power Clean': 'Power Clean',
      
      // Full body
      'Thruster (Agachamento + Desenvolvimento)': 'Thruster',
      'Renegade Row': 'Renegade Row',
      'Kettlebell Swing': 'Kettlebell Swing',
      'Man Makers': 'Man Maker',
      
      // Agility
      'Drill de Agilidade - T-Drill': 'T-Drill Agility',
      'Escada de Agilidade': 'Agility Ladder',
      'Shuttle Run': 'Shuttle Run'
    };
    
    return translations[name] || name;
  };

  // Get title based on objective (in English)
  const getObjectiveTitle = () => {
    return 'PERSONALIZED WORKOUT PLAN';
  };

  // Translate category from Portuguese to English for display
  const translateCategory = (categoria: string): string => {
    // First, map English form categories to Portuguese
    const englishToPortuguese: Record<string, string> = {
      'hypertrophy': 'hipertrofia',
      'weight_loss': 'emagrecimento',
      'strength': 'forca',
      'endurance': 'resistencia',
      'abs_challenge': 'desafio_trincar_abdomen',
      'shape_evolution': 'evoluir_shape'
    };
    
    // Convert if it's English
    const categoriaPortuguesa = englishToPortuguese[categoria.toLowerCase()] || categoria;
    
    // Then translate Portuguese to English display
    const translations: Record<string, string> = {
      'hipertrofia': 'HYPERTROPHY',
      'emagrecimento': 'FAT BURN',
      'forca': 'STRENGTH',
      'resistencia': 'ENDURANCE',
      'desafio_trincar_abdomen': 'ABS CHALLENGE',
      'evoluir_shape': 'SHAPE EVOLUTION'
    };
    
    return translations[categoriaPortuguesa] || 'CUSTOMIZED TRAINING';
  };

  return (
    <Document>
      {/* CAPA */}
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.topBar} />
        <View style={styles.orangeAccent} />
        
        <View style={styles.badge}>
          <Text style={styles.badgeText}>7-DAY PROGRAM</Text>
        </View>
                
        <Text style={styles.title}>{getObjectiveTitle()}</Text>
        <Text style={styles.subtitle}>Complete all 7 days and repeat until you reach your goal</Text>
                
        <View style={styles.athleteBox}>
          <Text style={{fontSize: 10, color: '#999999', textTransform: 'uppercase' as const, letterSpacing: 2, marginBottom: 6}}>ATHLETE</Text>
          <Text style={styles.athleteName}>{anamneseData.nome || 'Athlete'}</Text>
        </View>
                
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{anamneseData.peso || 0}kg</Text>
            <Text style={styles.infoLabel}>WEIGHT</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{anamneseData.altura || 0}cm</Text>
            <Text style={styles.infoLabel}>HEIGHT</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{getAge()}</Text>
            <Text style={styles.infoLabel}>AGE</Text>
          </View>
        </View>
                
        <View style={styles.dotsRow}>
          {[...Array(7)].map((_, i) => (
            <View key={i} style={i === 0 ? styles.dotActive : styles.dot} />
          ))}
        </View>
                
        <Text style={styles.footerNote}>Total focus on your goal: {translateCategory(anamneseData.categoria || 'hipertrofia')}</Text>
        <Text style={{fontSize: 7, color: '#E5E5E5', textAlign: 'center' as const, marginTop: 4}}>Generated on: {new Date().toLocaleString('en-US')}</Text>
      </Page>

      {/* TREINOS - Um por página */}
      {sevenDays.map((day, index) => (
        <Page key={`day-${index}`} size="A4" style={styles.page}>
          <View style={styles.workoutHeader}>
            <Text style={styles.dayTitle}>DAY {index + 1}</Text>
            <Text style={styles.dayLabel}>SINGLE WEEK • FOCUS ON GOAL</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${((index + 1) / 7) * 100}%` }]} />
            </View>
          </View>
          
          {day.dia.exercicios.map((exercicio: any, exIndex: number) => (
            <View key={exIndex} style={styles.exerciseItem}>
              <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseNumber}>{String(exIndex + 1).padStart(2, '0')}</Text>
                <Text style={styles.exerciseName}>{translateExerciseName(exercicio.nome) || 'Exercise'}</Text>
              </View>
              
              <View style={styles.exerciseDetails}>
                <View style={styles.detailBox}>
                  <Text style={styles.detailValue}>{exercicio.series || '3'}</Text>
                  <Text style={styles.detailLabel}>SETS</Text>
                </View>
                <View style={styles.detailSeparator} />
                <View style={styles.detailBox}>
                  {/* Special case for Plank - show seconds instead of reps */}
                  {translateExerciseName(exercicio.nome) === 'Plank' ? (
                    <>
                      <Text style={styles.detailValue}>{exercicio.tempo || '30s'}</Text>
                      <Text style={styles.detailLabel}>TIME</Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.detailValue}>{exercicio.repeticoes || '12'}</Text>
                      <Text style={styles.detailLabel}>REPS</Text>
                    </>
                  )}
                </View>
                <View style={styles.detailSeparator} />
                <View style={styles.detailBox}>
                  <Text style={styles.detailValue}>{exercicio.descanso || '60s'}</Text>
                  <Text style={styles.detailLabel}>REST</Text>
                </View>
              </View>
              
              {exercicio.dicaExpert && (
                <View style={styles.expertTip}>
                  <Text style={{fontSize: 10, color: '#FF8C00', marginBottom: 4}}>PRO TIP:</Text>
                  <Text style={styles.expertTipText}>{translateTip(exercicio.dicaExpert)}</Text>
                </View>
              )}
            </View>
          ))}
          
          <Text style={styles.footerNote}>Day {index + 1} of 7 • Complete all to see results</Text>
          <Text style={styles.pageNumber}>{index + 2}</Text>
        </Page>
      ))}

      {/* PÁGINA FINAL - Instruções */}
      <Page size="A4" style={styles.guidePage}>
        <Text style={styles.guideTitle}>HOW TO USE THIS PROGRAM</Text>
              
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>01</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>COMPLETE ALL 7 DAYS</Text>
            <Text style={styles.stepDescription}>
              Perform all 7 workouts in sequence. Rest when needed, but stay consistent.
            </Text>
          </View>
        </View>
              
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>02</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>REPEAT THE CYCLE</Text>
            <Text style={styles.stepDescription}>
              After completing the 7 days, restart the program. Each cycle brings more results and progress!
            </Text>
          </View>
        </View>
              
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>03</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>ALWAYS PROGRESS</Text>
            <Text style={styles.stepDescription}>
              Increase weights, reps, or intensity each cycle to keep evolving constantly.
            </Text>
          </View>
        </View>
              
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>ESTIMATED TIME</Text>
          <Text style={styles.infoBoxText}>4-6 weeks to see significant results. Results vary based on dedication and consistency.</Text>
        </View>
              
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>FOCUSED GOAL</Text>
          <Text style={styles.infoBoxText}>
            All exercises were specifically selected for: {translateCategory(anamneseData.categoria || 'hipertrofia')}. 
            This program is 100% personalized to your goal.
          </Text>
        </View>
              
        {workoutPlan.notasSeguranca && workoutPlan.notasSeguranca.length > 0 && (
          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>ATTENTION</Text>
            {workoutPlan.notasSeguranca.map((nota: string, index: number) => {
              // Translate safety notes from Portuguese to English
              const translations: Record<string, string> = {
                'Hidrate-se adequadamente antes, durante e apos o treino': 'Hydrate adequately before, during and after training',
                'Respeite os dias de descanso para recuperacao muscular': 'Respect rest days for muscle recovery',
                'Durma 7-9 horas por noite para resultados otimos': 'Sleep 7-9 hours per night for optimal results',
                'Alimente seu corpo adequadamente de acordo com seus objetivos': 'Fuel your body properly according to your goals',
                'Consulte um medico antes de iniciar qualquer programa de exercicios': 'Consult a physician before starting any exercise program'
              };
              const translatedNote = translations[nota] || nota;
              return <Text key={index} style={styles.warningText}>• {translatedNote}</Text>;
            })}
          </View>
        )}
              
        <Text style={styles.pageNumber}>8</Text>
      </Page>
    </Document>
  );
};

export default PdfTreino;
