'use client';

import { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import PdfTreino from './PdfTreino';
import { TreinoData } from '../types/anamnese';

interface DownloadButtonProps {
  treinoData: TreinoData;
  nomeUsuario: string;
}

const DownloadButton = ({ treinoData, nomeUsuario }: DownloadButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Busca dados REAIS do localStorage
  const getRealAnamneseData = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('anamneseData');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          
          // Calcula idade a partir da data de nascimento
          let idadeCalculada = 25;
          if (data.dataNascimento) {
            const hoje = new Date();
            const nascimento = new Date(data.dataNascimento);
            idadeCalculada = hoje.getFullYear() - nascimento.getFullYear();
            const mesDiff = hoje.getMonth() - nascimento.getMonth();
            if (mesDiff < 0 || (mesDiff === 0 && hoje.getDate() < nascimento.getDate())) {
              idadeCalculada--;
            }
          }
          
          // Converte altura e peso de STRING para NUMBER
          const alturaNum = parseFloat(String(data.altura).replace(',', '.')) || 175;
          const pesoNum = parseFloat(String(data.peso).replace(',', '.')) || 70;
          
          return {
            nome: data.nome || nomeUsuario,
            dataNascimento: data.dataNascimento || '1998-01-01',
            idade: idadeCalculada,
            peso: pesoNum,
            altura: alturaNum,
            categoria: data.categoria || 'hipertrofia',
            objetivo: data.objetivo || data.categoria ? mapCategoriaToObjetivo(data.categoria) : 'hipertrofia',
            nivel: data.nivel || data.experiencia ? mapExperienciaParaNivel(data.experiencia) : 'iniciante',
            localTreino: data.localTreino || 'academia',
            lesao: data.lesao || data.historicoLesoes || '',
          };
        } catch (e) {
          console.error('Erro ao parse anamneseData:', e);
        }
      }
    }
    // Fallback
    return {
      nome: nomeUsuario,
      dataNascimento: '1998-01-01',
      idade: 25,
      peso: 70,
      altura: 175,
      categoria: 'hipertrofia' as const,
      objetivo: 'hipertrofia' as const,
      nivel: 'intermediario' as const,
      localTreino: 'academia' as const,
      lesao: '',
    };
  };

  const mapCategoriaToObjetivo = (categoria: string): 'hipertrofia' | 'emagrecimento' | 'basquete' | 'forca' | 'resistencia' | 'saude' => {
    const cat = categoria.toLowerCase();
    if (cat.includes('emagrecimento')) return 'emagrecimento';
    if (cat.includes('hipertrofia') || cat.includes('shape')) return 'hipertrofia';
    if (cat.includes('basquete') || cat.includes('impulsao') || cat.includes('arremesso')) return 'basquete';
    if (cat.includes('forca')) return 'forca';
    if (cat.includes('resistencia') || cat.includes('corredor') || cat.includes('nadador')) return 'resistencia';
    return 'saude';
  };

  const mapExperienciaParaNivel = (experiencia: string): 'iniciante' | 'intermediario' | 'avancado' | 'pro' => {
    if (experiencia.includes('avancado')) return 'avancado';
    if (experiencia.includes('intermediario')) return 'intermediario';
    return 'iniciante';
  };

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const anamneseReal = getRealAnamneseData();
      
      // Create PDF document
      const doc = (
        <PdfTreino 
          workoutPlan={treinoData} 
          anamneseData={anamneseReal} 
        />
      );
      
      // Generate PDF blob
      const blob = await pdf(doc).toBlob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'plano-de-treino-completo.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
      
      setLoading(false);
    } catch (err) {
      console.error('❌ PDF Generation Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  };

  const anamneseReal = getRealAnamneseData();

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-bold mb-2">❌ Erro ao gerar PDF</p>
          <p className="text-sm">{error}</p>
          <button
            onClick={handleDownload}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Tentar Novamente
          </button>
        </div>
      )}
      
      <button
        onClick={handleDownload}
        disabled={loading}
        className={`w-full inline-flex justify-center items-center px-4 py-3 font-bold rounded-xl transition-all transform hover:scale-105 ${
          loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg'
        }`}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            🔄 Gerando PDF...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            📄 Baixar PDF com 12 Semanas de Treino
          </>
        )}
      </button>
      
      {/* Status info */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
        <p><strong>Status:</strong> {loading ? 'Gerando...' : 'Pronto'}</p>
        <p><strong>Treino weeks:</strong> {treinoData.semanas?.length || 0}</p>
        <p><strong>User:</strong> {anamneseReal.nome}</p>
      </div>
    </div>
  );
};

export default DownloadButton;