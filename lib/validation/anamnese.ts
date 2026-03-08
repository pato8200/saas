import { z } from 'zod';

export const anamneseSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  idade: z.number().min(15, 'Idade mínima é 15 anos').max(80, 'Idade máxima é 80 anos'),
  peso: z.number().min(30, 'Peso mínimo é 30kg').max(300, 'Peso máximo é 300kg'),
  altura: z.number().min(100, 'Altura mínima é 100cm').max(250, 'Altura máxima é 250cm'),
  objetivo: z.enum(['emagrecimento', 'hipertrofia', 'resistencia', 'forca', 'saude', 'basquete']),
  nivel: z.enum(['iniciante', 'intermediario', 'avancado', 'pro']),
  localTreino: z.enum(['casa', 'academia']),
  lesao: z.string().optional(),
});

export type AnamneseFormData = z.infer<typeof anamneseSchema>;