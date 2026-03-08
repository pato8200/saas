import { AnamneseFormData, TreinoData } from '../types/anamnese';

/**
 * LOCAL AI - Proprietary Workout Generation System
 * Does not depend on external APIs - Works 100% offline
 * 
 * Uses rule-based algorithm with:
 * - Pre-defined templates by goal
 * - Automatic periodization
 * - Intelligent load progression
 * - Varied exercises by category
 */

// ============================================================================
// EXERCISE DATABASE - PROFESSIONAL LEVEL
// +100 categorized exercises with detailed technical tips
// ============================================================================
const EXERCISES_DB = {
  // =========================================================================
  // QUADRICEPS - Focus on hypertrophy and strength
  // =========================================================================
  quadriceps: [
    { nome: "Barbell Back Squat", series: 4, repeticoes: "8-12", descanso: "90-120s", dicaExpert: "Keep chest up, descend to parallel or below (full ROM). Knees aligned with toes (don't let them cave in). Push the floor away on the way up, squeezing glutes." },
    { nome: "45° Leg Press", series: 4, repeticoes: "10-15", descanso: "90s", dicaExpert: "Feet shoulder-width apart on lower part of platform. Descend controlled to 90° (no more). Don't lock knees at top to maintain constant tension." },
    { nome: "Leg Extension", series: 3, repeticoes: "12-20", descanso: "60s", dicaExpert: "Hold 1-2 seconds at top of contraction (peak). Control descent for 3 seconds (slow eccentric). Feet slightly out activates VMO (vastus medialis)." },
    { nome: "Bulgarian Split Squat", series: 3, repeticoes: "10-12 each leg", descanso: "75s", dicaExpert: "Back foot elevated on bench. Torso leaned ~15° forward. Lower back knee until almost touching floor. Focus on front leg throughout full range." },
    { nome: "Hack Squat", series: 4, repeticoes: "10-15", descanso: "75s", dicaExpert: "Feet low on platform (closer to back). This isolates quads. Descend with control, knees shouldn't pass too far over toes." },
    { nome: "Dumbbell Walking Lunge", series: 3, repeticoes: "12-15 each leg", descanso: "60s", dicaExpert: "Wide stride (~2x shoulder width). Lower vertically (not forward). Back knee almost touches floor. Keep torso upright and core engaged." },
    { nome: "Goblet Squat", series: 3, repeticoes: "15-20", descanso: "60s", dicaExpert: "Hold dumbbell/kettlebell close to chest. Elbows pointing down. Squat keeping chest open. Great for learning squat pattern." },
    { nome: "Front Squat", series: 4, repeticoes: "8-12", descanso: "90s", dicaExpert: "Bar resting on front delts (hold with fingertips). Elbows high! Torso more upright than traditional squat. Total focus on quads." },
    { nome: "Step-Up", series: 3, repeticoes: "12-15 each leg", descanso: "60s", dicaExpert: "Box at knee height. Step up pushing through heel. Squeeze glute and quad at top. Lower controlled without 'falling'." },
    { nome: "Sissy Squat", series: 3, repeticoes: "10-15", descanso: "60s", dicaExpert: "Knees go forward, hips back. Torso leans back. Fully stretches rectus femoris. Use support if needed. Extreme quad isolation." }
  ],
  // =========================================================================
  // CALVES - Gastrocnemius and Soleus
  // =========================================================================
  calves: [
    { nome: "Standing Calf Raise", series: 5, repeticoes: "15-20", descanso: "45s", dicaExpert: "MAXIMUM range! Lower heel until you feel full stretch. Rise contracting hard 1-2s (peak). Parallel feet activate medial head." },
    { nome: "Seated Calf Raise", series: 4, repeticoes: "15-20", descanso: "45s", dicaExpert: "Focus on SOLEUS (deep muscle). Knees at 90°. Pause 1s at bottom. Activates type I endurance fibers." },
    { nome: "Leg Press Calf Raise", series: 4, repeticoes: "20-25", descanso: "60s", dicaExpert: "Feet on lower edge. Push extending knees completely. Hold contraction 2s at top. Full ROM!" },
    { nome: "Single-Leg Calf Raise", series: 3, repeticoes: "12-15 each leg", descanso: "30s", dicaExpert: "Hold dumbbell on one side. Support other leg. Focus on maximum contraction at top. Corrects asymmetries." },
    { nome: "Donkey Calf Raise", series: 4, repeticoes: "15-20", descanso: "45s", dicaExpert: "Torso parallel to floor (support on bench). Maximum stretch at bottom. Emphasizes medial/lateral gastrocnemius." },
    { nome: "Smith Machine Calf Raise", series: 4, repeticoes: "12-18", descanso: "60s", dicaExpert: "Bar on traps. Use wooden blocks under feet to increase range. Lower beyond line of feet." }
  ],
  // =========================================================================
  // POWER & PLYOMETRICS - Explosion and fast strength
  // =========================================================================
  power: [
    { nome: "Box Jump", series: 4, repeticoes: "8-10", descanso: "120s", dicaExpert: "Use arms for momentum. Land softly with knees slightly bent. Focus on maximum explosion. Box 60-90cm." },
    { nome: "Broad Jump", series: 4, repeticoes: "6-8", descanso: "120s", dicaExpert: "Squat quickly and jump as far as possible. Land softly (absorb impact). Walk back to reset." },
    { nome: "Jump Squat", series: 3, repeticoes: "10-12", descanso: "90s", dicaExpert: "Descend into squat and EXPLODE up jumping. Land softly and immediately start next rep." },
    { nome: "Depth Jump", series: 4, repeticoes: "6-8", descanso: "150s", dicaExpert: "Drop from box (30-45cm), land and IMMEDIATELY jump max. Ground contact time should be minimal (<0.2s)." },
    { nome: "Medicine Ball Slam", series: 3, repeticoes: "10-12", descanso: "90s", dicaExpert: "Lift medicine ball above head and throw to floor with max force. Squat to pick up and repeat." },
    { nome: "Horizontal Broad Jump", series: 4, repeticoes: "6-8", descanso: "120s", dicaExpert: "Feet shoulder width. Swing arms back and jump forward max. Land with both feet simultaneously." }
  ],
  
  // =========================================================================
  // PEITO - Desenvolvimento completo de peitoral (superior, médio, inferior)
  // =========================================================================
  peito: [
    { nome: "Supino Reto com Barra", series: 4, repeticoes: "8-12", descanso: "120s", dicaExpert: "Retraia ESCÁPULAS (junte e desça). Barra toca parte INFERIOR do peito. Cotovelos 45° do corpo. Exploda na subida!" },
    { nome: "Supino Inclinado com Halteres", series: 4, repeticoes: "10-12", descanso: "90s", dicaExpert: "Banco 30-45°. Foco em PEITORAL SUPERIOR. Desça halteres até altura do peito. Rotação externa no topo." },
    { nome: "Supino Declinado com Barra", series: 4, repeticoes: "8-12", descanso: "90s", dicaExpert: "Foco em PEITORAL INFERIOR. Pé travado sob apoio. Barra toca parte inferior do esterno. Cotovelos fechados." },
    { nome: "Crucifixo Inclinado", series: 3, repeticoes: "12-15", descanso: "75s", dicaExpert: "Braços LEVEMENTE flexionados (~10°). Abra até sentir alongar. Feche contraindo pico. Polegares apontam para teto." },
    { nome: "Crucifixo Reto", series: 3, repeticoes: "12-15", descanso: "60s", dicaExpert: "Deitado banco reto. Movimento de 'abraço'. Alongue máximo embaixo. Contraia forte em cima sem bater halteres." },
    { nome: "Flexão de Braço", series: 3, repeticoes: "15-20", descanso: "60s", dicaExpert: "Mãos largura dos ombros. Corpo RETO (prancha). Desça até peito quase tocar chão. Contraia glúteos e core." },
    { nome: "Crossover Polia Alta", series: 3, repeticoes: "15-20", descanso: "60s", dicaExpert: "Cabos acima da cabeça. Pegada pronada. Puxe para frente e para BAIXO (linha diagonal). Foque em ADUÇÃO horizontal." },
    { nome: "Peck Deck (Voador)", series: 3, repeticoes: "12-15", descanso: "60s", dicaExpert: "Ajuste banco para ALTURA DO PEITO. Apoie antebraços. Feche braços contraindo peitoral fortemente. Segure 1s no pico." },
    { nome: "Pull-Over com Haltere", series: 3, repeticoes: "12-15", descanso: "75s", dicaExpert: "Deitado PERPENDICULAR no banco (ombros apoiados). Quadril baixo. Desça haltere atrás da cabeça. Alongue dorsais E peitoral." },
    { nome: "Flexão Diamante", series: 3, repeticoes: "10-15", descanso: "60s", dicaExpert: "Mãos JUNTAS formando diamante. Foco em PEITORAL INTERNO e tríceps. Amplitude completa!" }
  ],
  // =========================================================================
  // OMBROS - Deltoides anterior, lateral e posterior
  // =========================================================================
  ombros: [
    { nome: "Desenvolvimento Militar com Halteres", series: 4, repeticoes: "8-12", descanso: "90s", dicaExpert: "Sentado com apoio lombar. Desça halteres até ALTURA DAS ORELHAS. Empurre para cima SEM hiperextender lombar. Contraia core!" },
    { nome: "Desenvolvimento Militar com Barra", series: 4, repeticoes: "6-10", descanso: "120s", dicaExpert: "Em pé, barra na altura do queixo. Empurre para cima em linha reta (não para frente). Retraia escápulas. Base firme!" },
    { nome: "Elevação Lateral", series: 4, repeticoes: "12-20", descanso: "60s", dicaExpert: "Levante braços até ALTURA DOS OMBROS. Polegares levemente para BAIXO no topo (como despejar água). NÃO balance tronco. Isolamento total!" },
    { nome: "Elevação Frontal com Barra", series: 3, repeticoes: "12-15", descanso: "60s", dicaExpert: "Suba barra até ALTURA DOS OLHOS. Desça controlando por 3 segundos. NÃO use impulso ou balance tronco." },
    { nome: "Elevação Frontal com Halteres Alternada", series: 3, repeticoes: "12 cada braço", descanso: "45s", dicaExpert: "Alternar braços. Suba um de cada vez. Controle a descida. Foco em deltoide ANTERIOR." },
    { nome: "Desenvolvimento Arnold", series: 3, repeticoes: "10-12", descanso: "75s", dicaExpert: "Comece PALMAS PARA ROSTO. Gire enquanto sobe. No topo PALMAS PARA FRENTE. Rotação completa trabalha todas cabeças do deltoide." },
    { nome: "Face Pull", series: 4, repeticoes: "15-20", descanso: "60s", dicaExpert: "Polia alta com corda. Puxe em direção à TESTA, ABRINDO cotovelos. Rotação externa no topo. Foco em DELTOIDE POSTERIOR e manguito rotador." },
    { nome: "Crucifixo Inverso (Posterior)", series: 3, repeticoes: "15-20", descanso: "60s", dicaExpert: "Incline tronco 45°. Braços estendidos, abra lateralmente. Foque em CONTRAIR posterior de ombro. NÃO use trapézio." },
    { nome: "Remada Alta (Upright Row)", series: 3, repeticoes: "12-15", descanso: "75s", dicaExpert: "Barra ou halteres. Puxe rente ao corpo até ALTURA DO PEITO. Cotovelos ALTOS (mais altos que mãos). Cuidado com impacto no ombro." }
  ],
  // =========================================================================
  // TRÍCEPS - Cabeças longa, lateral e medial
  // =========================================================================
  triceps: [
    { nome: "Tríceps Corda", series: 4, repeticoes: "12-15", descanso: "60s", dicaExpert: "Cotovelos COLADOS no corpo. Estenda COMPLETAMENTE e SEPARE corda no final contraindo tríceps. NÃO mova cotovelos!" },
    { nome: "Tríceps Testa", series: 4, repeticoes: "8-12", descanso: "90s", dicaExpert: "Barra W ou halteres. Desça até TESTA ou ATRÁS da cabeça (variação). MANTENHA cotovelos FIXOS. Foque em EXTENSÃO completa." },
    { nome: "Tríceps Francês", series: 3, repeticoes: "10-15", descanso: "60s", dicaExpert: "Haltere com DUAS MÃOS atrás da CABEÇA. Estenda COTOVELOS COMPLETAMENTE no TOPO. Mantenha cotovelos apontando para FRENTE." },
    { nome: "Tríceps Banco (Dips)", series: 3, repeticoes: "12-20", descanso: "60s", dicaExpert: "Mãos apoiadas em BANCO, PÉS NO CHÃO (iniciante) ou ESTICADOS (avançado). Desça QUADRIL PRÓXIMO ao chão. SUBA contraindo TRÍCEPS." },
    { nome: "Flexão Diamante", series: 3, repeticoes: "10-15", descanso: "60s", dicaExpert: "Mãos JUNTAS formando DIAMANTE (polegares e indicadores se tocam). COTOVELOS FECHADOS ao lado do CORPO. DESCER até peito tocar MÃOS. FOCO TOTAL EM TRÍCEPS!" },
    { nome: "Tríceps Polia Unilateral", series: 3, repeticoes: "12-15 cada braço", descanso: "45s", dicaExpert: "Pegada SUPINADA (palma para CIMA). Puxe para BAIXO contraindo TRÍCEPS. Cotovelo FIXO. Trabalha CABEÇA LONGA." },
    { nome: "Skull Crusher (Barra Reta)", series: 4, repeticoes: "8-12", descanso: "90s", dicaExpert: "Barra reta. Desça em direção à TESTA. MANTENHA cotovelos APONTANDO PARA FRENTE (não abram). SUBA EXTENDENDO COMPLETAMENTE." },
    { nome: "Close-Grip Bench Press", series: 4, repeticoes: "6-10", descanso: "120s", dicaExpert: "Supino RETO com PEGADA FECHADA (largura dos OMBROS). DESCER até PEITO. COTOVELOS RENTOS ao corpo. EMPURRAR EXPLODINDO. COMPOSTO PESADO para TRÍCEPS!" }
  ],
  
  // TREINO C - Costas, Bíceps, Core
  // =========================================================================
  // COSTAS - Dorsais, trapézio, romboides, redondo maior
  // =========================================================================
  costas: [
    { nome: "Barra Fixa (Pull-Up)", series: 4, repeticoes: "6-12", descanso: "120s", dicaExpert: "PEGADA PRONADA (palmas para FRENTE), LARGURA DOS OMBROS. Puxe PEITO em direção à BARRA. COTOVELOS para BAIXO e PARA TRÁS. CONTRAIA DORSAIS no TOPO!" },
    { nome: "Puxada Alta (Lat Pulldown)", series: 4, repeticoes: "10-15", descanso: "90s", dicaExpert: "PEGADA PRONADA LARGA. Puxe BARRA em direção ao PEITO (não atrás do pescoço). COTOVELOS BAIXOS. INCLINE TRONCO 15° para TRÁS. CONTRAIA DORSAIS!" },
    { nome: "Remada Curvada com Barra", series: 4, repeticoes: "8-12", descanso: "90s", dicaExpert: "TRONCO A 45°, JOELHOS LEVEMENTE FLEXIONADOS. Pegada PRONADA largura dos OMBROS. PUXE BARRA em direção ao UMBIGO. RETRAIA ESCÁPULAS NO TOPO. NÃO BALANCE!" },
    { nome: "Remada Curvada com Halteres (Ambas Mãos)", series: 4, repeticoes: "10-12", descanso: "90s", dicaExpert: "Mesma posição da remada com BARRA. Segure HALTERES. Puxe AMBOS simultaneamente. AMPLITUDE MAIOR que barra." },
    { nome: "Remada Unilateral com Haltere", series: 3, repeticoes: "10-12 cada lado", descanso: "75s", dicaExpert: "Apoie JOELHO e MÃO no BANCO. COSTAS RETAS. Puxe HALTERE em LINHA RETA, COTOVELO PRÓXIMO ao CORPO. DESÇA COMPLETAMENTE alongando dorsal." },
    { nome: "Remada Cavalinho (Máquina)", series: 4, repeticoes: "10-15", descanso: "90s", dicaExpert: "PEITO APOIADO no PAD. Pegada NEUTRA. Puxe ALÇAS em direção ao TRONCO. CONTRAIA ESCÁPULAS. NÃO tire PEITO do APOIO." },
    { nome: "Pull-Over com Haltere", series: 3, repeticoes: "12-15", descanso: "75s", dicaExpert: "Deitado PERPENDICULAR no BANCO (OMBROS apoiados). QUADRIL BAIXO. Segure HALTERE com DUAS MÃOS. DESÇA atrás da CABEÇA SENTINDO ALONGAR DORSAIS. SUBA contraindo." },
    { nome: "Remada Baixa Triângulo", series: 3, repeticoes: "12-15", descanso: "75s", dicaExpert: "Pés APOIADOS, JOELHOS FLEXIONADOS. Pegue TRIÂNGULO. Puxe em direção ao UMBIGO. INCLINE TRONCO para FRENTE na EXTENSÃO. CONTRAIA DORSAIS." },
    { nome: "Serrote (One-Arm Row)", series: 3, repeticoes: "10-12 cada lado", descanso: "60s", dicaExpert: "Apoie MÃO no BANCO, MESMO LADO da perna de APOIO. Puxe HALTERE em LINHA RETA. COTOVELO PASSA RENTE ao CORPO. FOQUE EM CONTRAIR dorsal." },
    { nome: "T-Bar Row", series: 4, repeticoes: "8-12", descanso: "90s", dicaExpert: "BARRA FIXA no CHÃO ou MÁQUINA. Pegada NEUTRA. Puxe em direção ao PEITO. COTOVELOS ALTOS. CONTRAIA MEIO DAS COSTAS." },
    { nome: "Face Pull (Posterior de Ombro/Trapézio)", series: 3, repeticoes: "15-20", descanso: "60s", dicaExpert: "POLIA ALTA com CORDA. Puxe em direção à TESTA, ABRINDO COTOVELOS. ROTAÇÃO EXTERNA. FOQUE em DELTOIDE POSTERIOR e TRAPÉZIO INFERIOR." }
  ],
  biceps: [
    { nome: "Rosca Direta com Barra W", series: 4, repeticoes: "10-12", descanso: "75s", dicaExpert: "Cotovelos colados no corpo. Suba contraindo bíceps fortemente, desça controlando por 3 segundos." },
    { nome: "Rosca Martelo Alternada", series: 3, repeticoes: "12 cada braço", descanso: "60s", dicaExpert: "Polegares para cima durante todo movimento. Não balance tronco. Contraia bíceps no topo." },
    { nome: "Rosca Scott", series: 3, repeticoes: "10-12", descanso: "75s", dicaExpert: "Apoie braços no banco Scott. Desça halteres completamente. Suba contraindo fortemente." },
    { nome: "Rosca Concentrada", series: 3, repeticoes: "10-12 cada", descanso: "60s", dicaExpert: "Cotovelo apoiado na coxa. Foque em pico de contração. Movimento lento e controlado." },
    { nome: "Rosca 21", series: 3, repeticoes: "21", descanso: "75s", dicaExpert: "7 reps meia amplitude inferior, 7 reps meia superior, 7 reps completas. Bombeamento intenso!" }
  ],
  // CORE/ABDOMEN - 20 exercises for complete ab training
  core: [
    { nome: "Prancha Abdominal", series: 4, repeticoes: "45-60s", descanso: "60s", dicaExpert: "Contraia glúteos e abdômen fortemente. Não deixe quadril cair ou subir demais." },
    { nome: "Russian Twist", series: 3, repeticoes: "20 total", descanso: "45s", dicaExpert: "Pés elevados, gire tronco tocando chão cada lado. Olhe sempre para as mãos durante movimento." },
    { nome: "Dead Bug", series: 3, repeticoes: "12 cada lado", descanso: "45s", dicaExpert: "Lombar pressionada no chão. Estenda braço e perna opostos simultaneamente com controle." },
    { nome: "Mountain Climber", series: 3, repeticoes: "40-50s", descanso: "60s", dicaExpert: "Posição de prancha, traga joelhos alternadamente em direção ao peito. Rápido e controlado." },
    { nome: "Abdominal Infra", series: 3, repeticoes: "15-20", descanso: "45s", dicaExpert: "Deitado, pernas estendidas. Levante pernas contraindo abdominal inferior. Desça controlando." },
    { nome: "Abdominal Remador", series: 3, repeticoes: "15-20", descanso: "45s", dicaExpert: "Deitado, abra braços e pernas formando X. Feche trazendo mãos aos pés contraindo abdômen." },
    { nome: "Bicicleta Abdominal", series: 3, repeticoes: "20 total", descanso: "45s", dicaExpert: "Cotovelo direito no joelho esquerdo e vice-versa. Movimento controlado e rotacionando tronco." },
    { nome: "Elevação de Joelhos Suspenso", series: 3, repeticoes: "12-15", descanso: "60s", dicaExpert: "Pendurado na barra, suba joelhos em direção ao peito. Não balance o corpo." },
    { nome: "Abdominal Canivete", series: 3, repeticoes: "12-15", descanso: "45s", dicaExpert: "Deitado, levante pernas e tronco simultaneamente tentando tocar os pés." },
    { nome: "Prancha com Toque no Ombro", series: 3, repeticoes: "20 total", descanso: "60s", dicaExpert: "Posição de prancha alta, toque ombro oposto alternadamente. Mantenha quadril estável." },
    { nome: "Hollow Body Hold", series: 3, repeticoes: "30-45s", descanso: "60s", dicaExpert: "Deitado, levante pernas e ombros do chão. Lombar pressionada no chão. Posição de banana." },
    { nome: "V-Up", series: 3, repeticoes: "10-12", descanso: "60s", dicaExpert: "Deitado, levante pernas e tronco formando V. Segure haltere se necessário." },
    { nome: "Prancha Lateral", series: 3, repeticoes: "30-45s cada lado", descanso: "45s", dicaExpert: "Apoie antebraço e lateral do pé. Quadril alto, corpo alinhado. Foque em oblíquos." },
    { nome: "Rotação Russa", series: 3, repeticoes: "15 cada lado", descanso: "45s", dicaExpert: "Sentado, incline tronco 45°. Gire medicine ball ou haltere de um lado para outro." },
    { nome: "Abdominal Reverso", series: 3, repeticoes: "15-20", descanso: "45s", dicaExpert: "Deitado, pernas dobradas 90°. Suba quadril do chão contraindo abdômen inferior." },
    { nome: "Abdominal Supra", series: 3, repeticoes: "20-25", descanso: "45s", dicaExpert: "Deitado, joelhos flexionados. Eleve tronco contraindo abdômen superior. Segure 1s no topo." },
    { nome: "Escalador (Mountain Climber)", series: 3, repeticoes: "30-40s", descanso: "60s", dicaExpert: "Posição de prancha, corra trazendo joelhos ao peito. Core contraído, respiração controlada." },
    { nome: "Prancha Dinâmica", series: 3, repeticoes: "12-15", descanso: "60s", dicaExpert: "Alterne entre prancha alta e baixa. Mantenha core estabilizado durante movimento." },
    { nome: "Leg Raise (Elevação de Pernas)", series: 3, repeticoes: "12-15", descanso: "60s", dicaExpert: "Deitado, pernas estendidas. Eleve até 90° sem descolar lombar do chão. Desça lentamente." },
    { nome: "Crunch Inverso", series: 3, repeticoes: "15-20", descanso: "45s", dicaExpert: "Deitado, joelhos 90°. Eleve quadril do chão usando abdominal inferior. Controle a descida." }
  ],
  
  // TREINO D - Posterior, Glúteos, Plyometrics
  posterior: [
    { nome: "Stiff com Barra", series: 4, repeticoes: "10-12", descanso: "90s", dicaExpert: "Joelhos levemente flexionados, desça barra rente às pernas. Sinta alongar posterior. Volte contraindo glúteos." },
    { nome: "Mesa Flexora", series: 4, repeticoes: "12-15", descanso: "75s", dicaExpert: "Deitado, puxe calcanhares em direção aos glúteos. Segure 1 segundo na contração máxima." },
    { nome: "Cadeira Flexora", series: 3, repeticoes: "12-15", descanso: "60s", dicaExpert: "Ajuste banco para joelhos alinhados com eixo. Puxe calcanhar em direção ao glúteo." },
    { nome: "Good Morning", series: 3, repeticoes: "12-15", descanso: "75s", dicaExpert: "Barra nas costas, tronco a 45 graus. Desça quadril para trás. Sinta alongar posterior." },
    { nome: "Swing com Kettlebell", series: 3, repeticoes: "15-20", descanso: "60s", dicaExpert: "Movimento de quadril, não de braços. Estenda tudo no topo. Kettlebell flutua na altura dos ombros." }
  ],
  gluteos: [
    { nome: "Elevação Pélvica (Hip Thrust)", series: 4, repeticoes: "12-15", descanso: "90s", dicaExpert: "Apoie costas no banco, barra sobre quadril. Desça quadril e suba contraindo glúteos fortemente no topo." },
    { nome: "Agachamento Sumô", series: 4, repeticoes: "12-15", descanso: "75s", dicaExpert: "Pés mais afastados que largura dos ombros, pontas para fora. Desça até paralelo ou abaixo." },
    { nome: "Cadeira Abdutora", series: 3, repeticoes: "15-20", descanso: "45s", dicaExpert: "Incline tronco para frente. Abra pernas contraindo glúteos lateralmente." },
    { nome: "Avanço Caminhando", series: 3, repeticoes: "12 cada perna", descanso: "75s", dicaExpert: "Passada ampla, desça joelho de trás quase até tocar chão. Tronco ereto e core contraído." },
    { nome: "Coice na Polia", series: 3, repeticoes: "15 cada perna", descanso: "45s", dicaExpert: "Use tornozelheira. Chute para trás contraindo glúteo máximo. Tronco estável." }
  ],
  plyometrics: [
    { nome: "Burpees com Salto", series: 3, repeticoes: "10-12", descanso: "90s", dicaExpert: "Agache, jogue pés para trás, flexão, volte pés e salte. Tudo rápido e explosivo sem pausa." },
    { nome: "Skater Jumps", series: 3, repeticoes: "10 cada lado", descanso: "90s", dicaExpert: "Salte lateralmente de uma perna só. Aterrisse suavemente e salte imediatamente para lado oposto." },
    { nome: "Tuck Jumps", series: 3, repeticoes: "8-10", descanso: "90s", dicaExpert: "Salte levando joelhos em direção ao peito. Aterrisse suave e salte novamente rapidamente." },
    { nome: "Power Clean", series: 5, repeticoes: "5", descanso: "150s", dicaExpert: "Pés largura quadril, puxe barra rente ao corpo. Tripla extensão tornozelo-joelho-quadril. Receba em meio agachamento." }
  ],
  
  // TREINO E - Full Body, Agilidade, Condicionamento
  fullbody: [
    { nome: "Thruster (Agachamento + Desenvolvimento)", series: 4, repeticoes: "10-12", descanso: "90s", dicaExpert: "Segure halteres nos ombros. Agache e ao subir empurre halteres acima da cabeça." },
    { nome: "Renegade Row", series: 3, repeticoes: "10 cada lado", descanso: "75s", dicaExpert: "Posição de prancha com halteres. Faça remada unilateral mantendo quadril estável." },
    { nome: "Kettlebell Swing", series: 4, repeticoes: "15-20", descanso: "90s", dicaExpert: "Movimento de quadril, não de braços. Estenda tudo no topo. Kettlebell flutua na altura dos ombros." },
    { nome: "Man Makers", series: 3, repeticoes: "8-10", descanso: "90s", dicaExpert: "Flexão, remada de cada lado, agache e desenvolva. Movimento completo e explosivo." }
  ],
  agilidade: [
    { nome: "Drill de Agilidade - T-Drill", series: 3, repeticoes: "3-4 execuções", descanso: "120s", dicaExpert: "Corra para frente, deslize lateral, volte lateral, corra para trás. Foque em mudanças rápidas de direção." },
    { nome: "Escada de Agilidade", series: 3, repeticoes: "30-40s", descanso: "60s", dicaExpert: "Pés rápidos, joelhos altos. Mantenha ritmo constante. Olhe para frente, não para pés." },
    { nome: "Shuttle Run", series: 3, repeticoes: "6-8 idas e vindas", descanso: "90s", dicaExpert: "Corra 10m, toque chão, volte. Foque em aceleração e desaceleração rápidas." }
  ],
  condicionamento: [
    { nome: "Mountain Climbers", series: 3, repeticoes: "40-50s", descanso: "60s", dicaExpert: "Posição de prancha, traga joelhos alternadamente em direção ao peito. Rápido e controlado." },
    { nome: "Polichinelos", series: 3, repeticoes: "60s", descanso: "45s", dicaExpert: "Pés abrem e fecham, braços sobem e descem. Ritmo constante e respiração controlada." },
    { nome: "Corrida Estacionária", series: 3, repeticoes: "60s", descanso: "45s", dicaExpert: "Joelhos altos, pés rápidos. Mantenha postura ereta. Balance braços." }
  ]
};

// Templates de divisão semanal por objetivo - AGORA COM FOCO ESPECÍFICO
const WORKOUT_SPLITS = {
  hipertrofia: [
    { dia: "Dia 1 - Peito & Tríceps (Empurrar)", grupos: ["peito", "triceps", "ombros"] },
    { dia: "Dia 2 - Costas & Bíceps (Puxar)", grupos: ["costas", "biceps"] },
    { dia: "Dia 3 - Pernas Completo", grupos: ["quadriceps", "posterior", "panturrilhas"] },
    { dia: "Dia 4 - Ombros & Trapézio", grupos: ["ombros"] },
    { dia: "Dia 5 - Braços (Bíceces & Tríceps)", grupos: ["biceps", "triceps"] },
    { dia: "Dia 6 - Pernas (Glúteos & Posterior)", grupos: ["gluteos", "posterior", "panturrilhas"] },
    { dia: "Dia 7 - Full Body Hipertrofia", grupos: ["peito", "costas", "quadriceps"] }
  ],
  emagrecimento: [
    { dia: "Dia 1 - Full Body HIIT", grupos: ["fullbody", "plyometrics", "condicionamento"] },
    { dia: "Dia 2 - Inferior Metabólico", grupos: ["quadriceps", "gluteos", "posterior"] },
    { dia: "Dia 3 - Cardio & Core Intenso", grupos: ["condicionamento", "core"] },
    { dia: "Dia 4 - Superior Queima", grupos: ["peito", "costas", "ombros"] },
    { dia: "Dia 5 - HIIT Total", grupos: ["fullbody", "plyometrics", "agilidade"] },
    { dia: "Dia 6 - Pernas & Glúteos", grupos: ["gluteos", "quadriceps", "panturrilhas"] },
    { dia: "Dia 7 - Desafio Final", grupos: ["fullbody", "condicionamento", "core"] }
  ],
  forca: [
    { dia: "Dia 1 - Agachamento & Força de Pernas", grupos: ["quadriceps", "posterior"] },
    { dia: "Dia 2 - Supino & Empurrar", grupos: ["peito", "ombros", "triceps"] },
    { dia: "Dia 3 - Levantamento Terra", grupos: ["posterior", "gluteos", "costas"] },
    { dia: "Dia 4 - Desenvolvimento Militar", grupos: ["ombros", "triceps"] },
    { dia: "Dia 5 - Barra Fixa & Puxar", grupos: ["costas", "biceps"] },
    { dia: "Dia 6 - Agachamento Frontal", grupos: ["quadriceps", "core"] },
    { dia: "Dia 7 - Full Body Força", grupos: ["fullbody", "potencia"] }
  ],
  resistencia: [
    { dia: "Dia 1 - Resistência de Pernas", grupos: ["quadriceps", "posterior", "panturrilhas"] },
    { dia: "Dia 2 - Resistência Superior", grupos: ["peito", "costas", "ombros"] },
    { dia: "Dia 3 - Core & Estabilidade", grupos: ["core"] },
    { dia: "Dia 4 - Full Body Resistência", grupos: ["fullbody", "condicionamento"] },
    { dia: "Dia 5 - Plyometrics & Agilidade", grupos: ["plyometrics", "agilidade"] },
    { dia: "Dia 6 - Circuito Metabólico", grupos: ["fullbody", "condicionamento"] },
    { dia: "Dia 7 - Desafio de Resistência", grupos: ["core", "condicionamento", "resistencia"] }
  ],
  
  // =========================================================================
  // DESAFIO TRICAR ABDÔMEN - Foco TOTAL em core e abdômen definido
  // =========================================================================
  desafio_trincar_abdomen: [
    { dia: "Dia 1 - Abdômen Superior & Oblíquos", grupos: ["core"] },
    { dia: "Dia 2 - Abdômen Inferior & Core Profundo", grupos: ["core"] },
    { dia: "Dia 3 - Rotação & Estabilidade", grupos: ["core"] },
    { dia: "Dia 4 - Abdômen Completo + Cardio HIIT", grupos: ["core", "condicionamento"] },
    { dia: "Dia 5 - Oblíquos & Cintura", grupos: ["core"] },
    { dia: "Dia 6 - Core Funcional + Mobilidade", grupos: ["core"] },
    { dia: "Dia 7 - Desafio Abdominal Extremo", grupos: ["core"] }
  ],
  
  // =========================================================================
  // EVOLUIR SHAPE - Desenvolvimento estético equilibrado
  // =========================================================================
  evoluir_shape: [
    { dia: "Dia 1 - Peito & Tríceps", grupos: ["peito", "triceps"] },
    { dia: "Dia 2 - Costas & Bíceps", grupos: ["costas", "biceps"] },
    { dia: "Dia 3 - Pernas Completo", grupos: ["quadriceps", "posterior", "panturrilhas"] },
    { dia: "Dia 4 - Ombros & Trapézio", grupos: ["ombros"] },
    { dia: "Dia 5 - Braços (Bíceps & Tríceps)", grupos: ["biceps", "triceps"] },
    { dia: "Dia 6 - Pernas (Glúteos) & Abdômen", grupos: ["gluteos", "core"] },
    { dia: "Dia 7 - Full Body Estético", grupos: ["peito", "costas", "ombros"] }
  ]
};

// Focos semanais de periodização
const WEEKLY_FOCUS = {
  1: "Adaptação Neuromuscular e Técnica",
  2: "Progressão Inicial de Volume",
  3: "Consolidação e Intensificação",
  4: "Recuperação Ativa (Deload)",
  5: "Hipertrofia Funcional",
  6: "Força e Potência",
  7: "Resistência Muscular",
  8: "Recuperação e Reset",
  9: "Pico de Intensidade",
  10: "Sobrecarga Máxima",
  11: "Consolidação Final",
  12: "Teste e Avaliação"
};

export function gerarTreinoLocal(formData: AnamneseFormData): TreinoData {
  console.log('🧠 Generating workout with LOCAL AI (no API needed!)');
  console.log('👤 Athlete:', formData.nome, '| Category:', formData.categoria, '| Level:', formData.nivel);
  
  const semanas: any[] = [];
  
  // For abdomen challenge: generate ONLY 1 week (7 days)
  // For other objectives: generate 12 weeks
  const isAbdomenChallenge = formData.categoria === 'desafio_trincar_abdomen';
  const numSemanas = isAbdomenChallenge ? 1 : 12;
  
  console.log('📊 IS ABDOMEN CHALLENGE?', isAbdomenChallenge, '| Weeks to generate:', numSemanas);
  
  // CRITICAL FIX: Add timestamp to ensure DIFFERENT workouts every time!
  // This prevents the same workout from being generated repeatedly
  const timestampSeed = Date.now();
  
  for (let semanaNum = 1; semanaNum <= numSemanas; semanaNum++) {
    const divisaoSemanal = gerarSemana(formData, semanaNum, timestampSeed);
    
    console.log('📋 Week', semanaNum, '- Days generated:', divisaoSemanal.length);
    console.log('📋 Day 1 exercises:', divisaoSemanal[0]?.exercicios?.map((e: any) => e.nome).join(', '));
    
    semanas.push({
      semana: semanaNum,
      foco: WEEKLY_FOCUS[semanaNum as keyof typeof WEEKLY_FOCUS],
      divisaoSemanal: divisaoSemanal
    });
  }
  
  const treinoData: TreinoData = {
    semanas,
    guiaExecucao: gerarGuiaExecucao(formData),
    notasSeguranca: gerarNotasSeguranca(formData),
    periodizacao: {
      objetivo: formData.categoria,
      duracao: isAbdomenChallenge ? '7 dias (Desafio)' : '12 semanas',
      fases: isAbdomenChallenge 
        ? ["Desafio de 7 dias - Repita até atingir seu objetivo"]
        : [
            "Fase 1 (Semanas 1-3): Adaptação e Técnica",
            "Fase 2 (Semanas 4-7): Hipertrofia e Força",
            "Fase 3 (Semanas 8-11): Intensificação e Pico",
            "Fase 4 (Semana 12): Consolidação e Teste"
          ]
    }
  };
  
  console.log('✅ Local AI workout generated successfully!', {
    weeks: treinoData.semanas.length,
    daysPerWeek: treinoData.semanas[0].divisaoSemanal.length,
    exercisesPerDay: treinoData.semanas[0].divisaoSemanal[0].exercicios.length
  });
  
  return treinoData;
}

function gerarSemana(formData: AnamneseFormData, semanaNum: number, timestampSeed?: number) {
  const categoria = formData.categoria as keyof typeof WORKOUT_SPLITS;
  let split = WORKOUT_SPLITS[categoria];
  
  console.log('📋 Generating week', semanaNum, '| Category:', categoria, '| Split exists?', !!split);
  
  // CRITICAL FIX: If category not found, log error and use abdomen challenge as default
  if (!split) {
    console.error('❌ Category', categoria, 'NOT FOUND in WORKOUT_SPLITS!');
    console.error('📋 Available categories:', Object.keys(WORKOUT_SPLITS).join(', '));
    console.log('⚠️ Falling back to hipertrofia');
    split = WORKOUT_SPLITS.hipertrofia;
  }
  
  console.log('📋 Split length:', split.length, '| First day groups:', split[0]?.grupos);
  
  const divisao: any[] = [];
  
  // Determinar intensidade baseada na semana (periodização avançada)
  const intensidadeMultiplier = calcularIntensidade(semanaNum);
  
  // Hash único para esta semana + usuário + timestamp (garante variação!)
  const weekHash = semanaNum + (formData.nome ? formData.nome.length : 0) + (timestampSeed ? Math.floor(timestampSeed / 10000) : 0);
  
  split.forEach((dia, index) => {
    const exerciciosDia: any[] = [];
    const exerciciosUsadosNestaSemana = new Set<string>();
    
    console.log('💪 Day', index + 1, '-', dia.dia, '| Muscle groups:', dia.grupos);
    
    // CRITICAL FIX: For core-focused days (abs), ONLY use core exercises!
    const isCoreFocus = dia.grupos.every(g => g === 'core');
    console.log('   🎯 Is Core Focus?', isCoreFocus);
    
    // Selecionar exercícios para cada grupo muscular do dia
    dia.grupos.forEach((grupo: string) => {
      const exerciciosGrupo = EXERCISES_DB[grupo as keyof typeof EXERCISES_DB] || [];
      
      if (exerciciosGrupo.length === 0) return;
      
      // For core/abs focus: select MORE exercises (4-6) to fill the workout
      // For other focuses: select 2-3 exercises per group
      const numExercicios = isCoreFocus ? 5 : (split.length <= 4 ? 3 : 2);
      
      const selecionados = selecionarExerciciosAvancado(
        exerciciosGrupo, 
        numExercicios, 
        weekHash, 
        index,
        exerciciosUsadosNestaSemana
      );
      
      selecionados.forEach(ex => {
        exerciciosUsadosNestaSemana.add(ex.nome);
        exerciciosDia.push({
          ...ex,
          series: ajustarSeries(ex.series, intensidadeMultiplier, semanaNum),
          repeticoes: ajustarRepeticoes(ex.repeticoes, intensidadeMultiplier, semanaNum),
          descanso: ajustarDescanso(ex.descanso, intensidadeMultiplier, semanaNum)
        });
      });
    });
    
    // BONUS EXERCISES: Only add from SAME groups - NEVER add unrelated muscle groups!
    const nivelBonus = formData.nivel === 'avancado' ? 2 : formData.nivel === 'intermediario' ? 1 : 0;
    
    // CRITICAL FIX: If this is a core-focused day (abs), DO NOT add bonus exercises from other muscle groups
    if (!isCoreFocus && exerciciosDia.length < 6 + nivelBonus && exerciciosDia.length > 0) {
      // Add complementary exercises ONLY from the groups already specified for this day
      const exerciciosComplementares: any[] = [];
      dia.grupos.forEach((grupo: string) => {
        const exs = EXERCISES_DB[grupo as keyof typeof EXERCISES_DB] || [];
        exerciciosComplementares.push(...exs);
      });
      
      const naoUsados = exerciciosComplementares.filter(ex => !exerciciosUsadosNestaSemana.has(ex.nome));
      
      if (naoUsados.length > 0) {
        const bonusIndex = weekHash % naoUsados.length;
        const exercicioBonus = naoUsados[bonusIndex];
        exerciciosDia.push({
          ...exercicioBonus,
          series: 3,
          repeticoes: "12-15",
          descanso: "60s"
        });
      }
    }
    
    // Ordenar exercícios: compostos primeiro, isoladores depois
    exerciciosDia.sort((a, b) => {
      const compostoA = a.series >= 4 ? -1 : 1;
      const compostoB = b.series >= 4 ? -1 : 1;
      return compostoA - compostoB;
    });
    
    divisao.push({
      dia: dia.dia,
      exercicios: exerciciosDia.slice(0, 8) // Máximo 8 exercícios por dia
    });
  });
  
  return divisao;
}

function selecionarExercicios(exercicios: any[], quantidade: number, semanaNum: number) {
  // Variar exercícios baseado na semana para evitar repetição
  const seed = semanaNum % 3; // 3 variações diferentes
  const embaralhados = [...exercicios].sort((a, b) => {
    const hashA = a.nome.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) + seed;
    const hashB = b.nome.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) + seed;
    return hashA - hashB;
  });
  
  return embaralhados.slice(0, quantidade);
}

function selecionarExerciciosAvancado(
  exercicios: any[], 
  quantidade: number, 
  weekHash: number, 
  diaIndex: number,
  usadosNestaSemana: Set<string>
): any[] {
  // Algoritmo avançado para máxima variedade sem repetições na mesma semana
  
  // Filtrar exercícios já usados nesta semana
  const disponiveis = exercicios.filter(ex => !usadosNestaSemana.has(ex.nome));
  
  if (disponiveis.length === 0) {
    // Se todos já foram usados, resetar e permitir repetição
    return exercicios.slice(0, quantidade);
  }
  
  // Hash baseado no dia e semana para consistência
  const daySeed = weekHash + diaIndex;
  
  // Embaralhar baseado no seed do dia
  const embaralhados = [...disponiveis].sort((a, b) => {
    const hashA = a.nome.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) + daySeed;
    const hashB = b.nome.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) + daySeed;
    return ((hashA * 31 + diaIndex) % 7) - ((hashB * 31 + diaIndex) % 7);
  });
  
  // Selecionar exercícios prioritários (compostos primeiro se for início do dia)
  const compostos = embaralhados.filter(ex => ex.series >= 4);
  const isoladores = embaralhados.filter(ex => ex.series < 4);
  
  const resultado: any[] = [];
  
  // Adicionar 1-2 compostos primeiro
  const numCompostos = Math.min(Math.ceil(quantidade / 2), compostos.length);
  for (let i = 0; i < numCompostos; i++) {
    resultado.push(compostos[i]);
  }
  
  // Completar com isoladores
  const restantes = quantidade - resultado.length;
  for (let i = 0; i < restantes && i < isoladores.length; i++) {
    if (!resultado.includes(isoladores[i])) {
      resultado.push(isoladores[i]);
    }
  }
  
  return resultado.slice(0, quantidade);
}

function calcularIntensidade(semanaNum: number): number {
  // Periodização ondulatória
  if (semanaNum === 4 || semanaNum === 8 || semanaNum === 12) {
    return 0.6; // Semanas de deload
  } else if (semanaNum <= 3) {
    return 0.7 + (semanaNum - 1) * 0.1; // Fase 1: adaptação
  } else if (semanaNum <= 7) {
    return 0.85 + (semanaNum - 4) * 0.05; // Fase 2: progressão
  } else {
    return 0.95 + (semanaNum - 8) * 0.025; // Fase 3: intensificação
  }
}

function ajustarSeries(seriesOriginais: number, multiplier: number, semanaNum: number): number {
  if (semanaNum === 4 || semanaNum === 8 || semanaNum === 12) {
    return Math.max(2, Math.round(seriesOriginais * 0.6)); // Deload
  }
  return Math.round(seriesOriginais * multiplier);
}

function ajustarRepeticoes(repeticoesOriginais: string, multiplier: number, semanaNum: number): string {
  if (semanaNum === 4 || semanaNum === 8 || semanaNum === 12) {
    return "12-15"; // Deload: mais repetições, menos carga
  }
  
  const match = repeticoesOriginais.match(/(\d+)-?(\d*)/);
  if (!match) return repeticoesOriginais;
  
  const min = Math.round(parseInt(match[1]) * multiplier);
  const max = match[2] ? Math.round(parseInt(match[2]) * multiplier) : min;
  
  return max !== min ? `${min}-${max}` : `${min}`;
}

function ajustarDescanso(descansoOriginal: string, multiplier: number, semanaNum: number): string {
  if (semanaNum === 4 || semanaNum === 8 || semanaNum === 12) {
    return "60s"; // Deload: descanso padrão
  }
  
  const match = descansoOriginal.match(/(\d+)/);
  if (!match) return descansoOriginal;
  
  const segundos = Math.round(parseInt(match[1]) * (2 - multiplier));
  return `${segundos}s`;
}

function gerarGuiaExecucao(formData: AnamneseFormData) {
  return [
    {
      titulo: "Aquecimento Obrigatório",
      descricao: "Realize 5-10 minutos antes de cada sessão para preparar o corpo e prevenir lesões.",
      dicas: [
        "Mobilidade articular dinâmica (5 min)",
        "Ativação de core com prancha (2x30s)",
        "2 séries leves do primeiro exercício"
      ]
    },
    {
      titulo: "Progressão de Carga",
      descricao: "Aumente o peso gradualmente ao completar todas as repetições com forma perfeita.",
      dicas: [
        "Adicione 2.5-5kg quando atingir o alvo superior",
        "Mantenha registro detalhado dos treinos",
        "Priorize execução correta sobre pesos pesados"
      ]
    },
    {
      titulo: "Recuperação e Nutrição",
      descricao: "O crescimento muscular acontece durante o descanso. Alimente-se adequadamente.",
      dicas: [
        "Durma 7-9 horas por noite",
        "Consuma proteína pós-treino (20-30g)",
        "Hidrate-se adequadamente (35ml/kg)"
      ]
    },
    {
      titulo: "Execução Correta",
      descricao: "Mantenha técnica impecável em todos os exercícios para maximizar resultados e prevenir lesões.",
      dicas: [
        "Controle a fase excêntrica (descida)",
        "Expire durante o esforço (fase concêntrica)",
        "Mantenha core contraído durante todos os movimentos"
      ]
    }
  ];
}

function gerarNotasSeguranca(formData: AnamneseFormData) {
  const notas = [
    "Hidrate-se adequadamente antes, durante e após o treino",
    "Respeite os dias de descanso para recuperação muscular",
    "Durma 7-9 horas por noite para resultados ótimos",
    "Alimente seu corpo adequadamente de acordo com seus objetivos",
    "Consulte um médico antes de iniciar qualquer programa de exercícios"
  ];
  
  if (formData.lesao && formData.lesao.trim() !== '') {
    notas.unshift(`⚠️ ATENÇÃO: Usuário reportou lesão "${formData.lesao}". Consulte profissional para adaptações.`);
  }
  
  return notas;
}
