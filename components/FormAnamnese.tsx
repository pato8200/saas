'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { anamneseSchema, AnamneseFormData } from '../lib/validation/anamnese';
import { useState } from 'react';

interface FormAnamneseProps {
  onSubmit: (data: AnamneseFormData) => void;
  loading?: boolean;
}

const FormAnamnese = ({ onSubmit, loading = false }: FormAnamneseProps) => {
  const [showLesaoInput, setShowLesaoInput] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<AnamneseFormData>({
    resolver: zodResolver(anamneseSchema),
    defaultValues: {
      nome: '',
      idade: 0,
      peso: 0,
      altura: 0,
      objetivo: 'emagrecimento',
      nivel: 'iniciante',
      localTreino: 'casa',
      lesao: ''
    }
  });

  const objetivoValue = watch('objetivo');

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Formulário de Anamnese</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nome */}
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nome Completo *
          </label>
          <input
            id="nome"
            {...register('nome')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.nome 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            placeholder="Digite seu nome completo"
          />
          {errors.nome && (
            <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
          )}
        </div>

        {/* Idade, Peso e Altura */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="idade" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Idade *
            </label>
            <input
              id="idade"
              type="number"
              {...register('idade', { valueAsNumber: true })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.idade 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              placeholder="Idade"
            />
            {errors.idade && (
              <p className="mt-1 text-sm text-red-600">{errors.idade.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="peso" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Peso (kg) *
            </label>
            <input
              id="peso"
              type="number"
              step="0.1"
              {...register('peso', { valueAsNumber: true })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.peso 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              placeholder="Peso em kg"
            />
            {errors.peso && (
              <p className="mt-1 text-sm text-red-600">{errors.peso.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="altura" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Altura (cm) *
            </label>
            <input
              id="altura"
              type="number"
              step="0.1"
              {...register('altura', { valueAsNumber: true })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.altura 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              placeholder="Altura em cm"
            />
            {errors.altura && (
              <p className="mt-1 text-sm text-red-600">{errors.altura.message}</p>
            )}
          </div>
        </div>

        {/* Objetivo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Objetivo *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { value: 'emagrecimento', label: 'Emagrecimento' },
              { value: 'hipertrofia', label: 'Hipertrofia' },
              { value: 'resistencia', label: 'Resistência' },
              { value: 'forca', label: 'Força' },
              { value: 'saude', label: 'Saúde' }
            ].map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  id={option.value}
                  type="radio"
                  value={option.value}
                  {...register('objetivo')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor={option.value} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          {errors.objetivo && (
            <p className="mt-1 text-sm text-red-600">{errors.objetivo.message}</p>
          )}
        </div>

        {/* Nível */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nível *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { value: 'iniciante', label: 'Iniciante' },
              { value: 'intermediario', label: 'Intermediário' },
              { value: 'avancado', label: 'Avançado' },
              { value: 'pro', label: 'Pro' }
            ].map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  id={option.value}
                  type="radio"
                  value={option.value}
                  {...register('nivel')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor={option.value} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          {errors.nivel && (
            <p className="mt-1 text-sm text-red-600">{errors.nivel.message}</p>
          )}
        </div>

        {/* Local de Treino */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Local de Treino *
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 'casa', label: 'Treino em Casa' },
              { value: 'academia', label: 'Treino na Academia' }
            ].map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  id={option.value}
                  type="radio"
                  value={option.value}
                  {...register('localTreino')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor={option.value} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          {errors.localTreino && (
            <p className="mt-1 text-sm text-red-600">{errors.localTreino.message}</p>
          )}
        </div>

        {/* Lesões */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Possui alguma lesão?
          </label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                id="lesao-nao"
                type="radio"
                value="nao"
                onChange={() => setShowLesaoInput(false)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="lesao-nao" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Não
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="lesao-sim"
                type="radio"
                value="sim"
                onChange={() => setShowLesaoInput(true)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="lesao-sim" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Sim
              </label>
            </div>
          </div>
          
          {showLesaoInput && (
            <div className="mt-3">
              <textarea
                {...register('lesao')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Descreva sua lesão e quaisquer restrições médicas"
              ></textarea>
            </div>
          )}
        </div>



        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md text-white font-medium ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          } transition duration-300 ease-in-out`}
        >
          {loading ? 'Processando...' : 'Gerar Plano de Treino'}
        </button>
      </form>
    </div>
  );
};

export default FormAnamnese;