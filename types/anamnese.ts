export interface AnamneseFormData {
  nome: string;
  dataNascimento: string;
  idade?: number;
  peso: number;
  altura: number;
  categoria: 'hipertrofia' | 'emagrecimento' | 'forca' | 'resistencia' | 'desafio_trincar_abdomen' | 'evoluir_shape';
  nivel: 'iniciante' | 'intermediario' | 'avancado' | 'pro';
  localTreino: 'casa' | 'academia' | 'clube';
  lesao: string;
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