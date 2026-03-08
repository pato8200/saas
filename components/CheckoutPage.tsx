'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnamneseFormData } from '../lib/validation/anamnese';

interface CheckoutPageProps {
  formData: AnamneseFormData;
  valor: number;
}

const CheckoutPage = ({ formData, valor }: CheckoutPageProps) => {
  const router = useRouter();
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [pixCopyPaste, setPixCopyPaste] = useState('');
  const [loading, setLoading] = useState(true);

  // Simular chamada para API de pagamento
  useEffect(() => {
    const gerarQRCode = async () => {
      try {
        // Em uma implementação real, isso seria uma chamada para a API do InfinitePay
        // Para este exemplo, vamos simular o retorno
        setTimeout(() => {
          setQrCode('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ3aGl0ZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkFSRVUgUElYPC90ZXh0Pjwvc3ZnPg=='); // SVG de exemplo
          setPixCopyPaste('00020126580014BR.GOV.BCB.PIX013612345678-1234-1234-1234-12345678901252040000530398654040.005802BR5917NOME DO RECEBEDOR6008BRASILIA62070503***6304A1B2');
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erro ao gerar QR Code:', error);
        setLoading(false);
      }
    };

    gerarQRCode();
  }, [formData, valor]);

  const handlePaymentConfirmation = () => {
    // Em uma implementação real, isso seria tratado por um webhook
    // Por enquanto, simulamos a confirmação e redirecionamos para a página de sucesso
    router.push('/success');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Finalizar Pagamento</h1>
      
      <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <h2 className="text-lg font-semibold text-green-800 dark:text-green-200">Resumo do Pedido</h2>
        <p className="text-gray-700 dark:text-gray-300">Plano de Treino Personalizado</p>
        <div className="flex justify-between mt-2">
          <span className="font-medium">Subtotal:</span>
          <span>R$ {(valor).toFixed(2)}</span>
        </div>

        <div className="flex justify-between mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 font-bold">
          <span>Total:</span>
          <span>R$ {valor.toFixed(2)}</span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-white">Pagamento via PIX</h2>
        
        {qrCode && (
          <div className="flex flex-col items-center mb-6">
            <img 
              src={qrCode} 
              alt="QR Code PIX" 
              className="w-64 h-64 border border-gray-300 p-2 bg-white rounded-lg"
            />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Aponte sua câmera para o código acima</p>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Chave PIX Copiar e Colar:
          </label>
          <div className="flex">
            <input
              type="text"
              value={pixCopyPaste}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white truncate"
            />
            <button 
              onClick={() => navigator.clipboard.writeText(pixCopyPaste)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              Copiar
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Voltar
        </button>
        <button
          onClick={handlePaymentConfirmation}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Confirmar Pagamento
        </button>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>Após o pagamento, seu plano de treino será gerado automaticamente.</p>
      </div>
    </div>
  );
};

export default CheckoutPage;