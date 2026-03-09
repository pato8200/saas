export interface AnamneseFormData {
  nome: string;
  dataNascimento?: string;
  idade?: number;
  peso: number;
  altura: number;
  // Accept both English (from form) and Portuguese (mapped) categories
  categoria: 'hypertrophy' | 'weight_loss' | 'strength' | 'endurance' | 'abs_challenge' | 'shape_evolution' | 'hipertrofia' | 'emagrecimento' | 'forca' | 'resistencia' | 'desafio_trincar_abdomen' | 'evoluir_shape';
  nivel: 'iniciante' | 'intermediario' | 'avancado' | 'pro';
  localTreino: 'casa' | 'academia' | 'clube';
  lesao?: string;
  // Additional form fields
  objetivo?: string;
  availableDays?: string;
  timePerWorkout?: string;
  workoutLocation?: string;
  availableEquipment?: string[];
  injuryHistory?: string;
  medicalConditions?: string;
  medications?: string;
  pastSurgeries?: string;
  sleepQuality?: string;
  sleepHours?: string;
  stressLevel?: string;
  nutrition?: string;
  trainedBefore?: string;
  mainMotivation?: string;
  resultExpectations?: string;
  temporaryLimitations?: string;
  workoutPreferences?: string;
}

export interface Exercicio {
  nome: string;
  series: number;
  repeticoes: string;
  descanso: string;
  dicaExpert: string;
}

export interface SemanaTreino {
  semana: number;
  foco: string;
  divisaoSemanal: {
    dia: string;
    exercicios: Exercicio[];
  }[];
}

export interface TreinoData {
  semanas: SemanaTreino[];
  guiaExecucao: {
    titulo: string;
    descricao: string;
    dicas: string[];
  }[];
  notasSeguranca: string[];
  periodizacao: {
    objetivo: string;
    duracao: string;
    fases: string[];
  };
}