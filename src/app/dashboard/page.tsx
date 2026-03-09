'use client';

import { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import PdfTreino from '../../../components/PdfTreino';
import DownloadButton from '../../../components/DownloadButton';
import { TreinoData, AnamneseFormData } from '../../../types/anamnese';

const DashboardPage = () => {
  const [userData, setUserData] = useState<AnamneseFormData | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<TreinoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [pdfKey, setPdfKey] = useState(0); // Force PDF regeneration

  useEffect(() => {
    // CRITICAL FIX: Clear old workout when loading dashboard to prevent stale data
    const storedData = localStorage.getItem('anamneseData');
    const storedWorkout = localStorage.getItem('workoutPlan');
    
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        console.log('📋 Loaded user data:', {
          nome: parsed.nome,
          categoria: parsed.categoria,
          nivel: parsed.nivel,
          localTreino: parsed.localTreino
        });
        setUserData(parsed);
        
        // Remove old workout to force regeneration with correct data
        if (storedWorkout) {
          console.log('🗑️ Removing old workout to force regeneration');
          localStorage.removeItem('workoutPlan');
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
    
    setLoading(false);
  }, []);

  const generateWorkout = async () => {
    if (!userData) {
      alert('Please fill out the form first');
      return;
    }

    setGenerating(true);
    try {
      console.log('🧠 Generating workout with LOCAL AI (INSTANT)...');
      console.log('📋 Current userData:', JSON.stringify(userData, null, 2));
      
      // CRITICAL: Add timestamp to URL to force different workouts every time
      const response = await fetch('/api/gerar-treino?timestamp=' + Date.now(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Error generating workout');
      }
      
      const data = await response.json();
      const treino = data.treino;
      
      console.log('✅ Workout generated! First day exercises:', treino.semanas?.[0]?.divisaoSemanal?.[0]?.exercicios?.map((e: any) => e.nome).join(', '));
      console.log('📊 Category used:', treino.periodizacao?.objetivo);
      
      // Save to localStorage
      localStorage.setItem('workoutPlan', JSON.stringify(treino));
      
      // CRITICAL FIX: Force state update with NEW object reference
      setWorkoutPlan(null); // Clear first
      setTimeout(() => {
        setWorkoutPlan({ ...treino }); // Then set with spread to ensure new reference
      }, 10);
      
      console.log('✅ State updated, PDF ready for download!');
      alert('✅ Workout generated successfully! Each generation is unique and different from the previous one.');
    } catch (error) {
      console.error('❌ Error:', error);
      alert('❌ Error generating workout: ' + (error as Error).message);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Workout Program</h1>
            <p className="text-gray-600">7-day personalized program focused on your goal</p>
          </div>

          {/* User Data */}
          {userData && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 mb-8 border-2 border-yellow-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Athlete: {userData.nome}</h2>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Goal</p>
                  <p className="font-semibold text-orange-600 capitalize">{userData.categoria || 'Hypertrophy'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Level</p>
                  <p className="font-semibold capitalize">{userData.nivel || 'Intermediate'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="font-semibold capitalize">{userData.localTreino || 'Gym'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Workout Status */}
          {!workoutPlan ? (
            <div className="text-center py-12">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 mb-6">
                <svg className="w-16 h-16 mx-auto text-yellow-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Your workout is ready to be generated!</h3>
                <p className="text-gray-600 mb-6">Click the button below to create your personalized 7-day program</p>
                <button
                  onClick={generateWorkout}
                  disabled={generating}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-yellow-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {generating ? 'Generating...' : '🎯 GENERATE MY FREE WORKOUT'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Workout Summary */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-800">Workout Generated Successfully!</h3>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-orange-600">{workoutPlan.semanas?.length || 1}</p>
                    <p className="text-sm text-gray-600">Week(s)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-orange-600">{workoutPlan.semanas?.[0]?.divisaoSemanal?.length || 7}</p>
                    <p className="text-sm text-gray-600">Day(s) of Training</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-orange-600">{workoutPlan.semanas?.[0]?.divisaoSemanal?.[0]?.exercicios?.length || 6}</p>
                    <p className="text-sm text-gray-600">Exercises per Day</p>
                  </div>
                </div>
              </div>

              {/* Single Download Button */}
              <DownloadButton treinoData={workoutPlan} nomeUsuario={userData?.nome || 'Athlete'} />
              
              <p className="mt-4 text-gray-600 text-sm text-center">Your complete 7-day workout in premium format</p>

              {/* Additional Options */}
              <div className="border-t pt-6 mt-6">
                <button
                  onClick={generateWorkout}
                  className="w-full py-3 text-orange-600 font-medium hover:bg-orange-50 rounded-lg transition-colors"
                >
                  🔄 Generate New Workout (Restart)
                </button>
              </div>
            </div>
          )}

          {/* Important Information */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-800 mb-3">📌 How to use your program:</h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start">
                <span className="mr-2">1️⃣</span>
                Complete all 7 days of training in sequence
              </li>
              <li className="flex items-start">
                <span className="mr-2">2️⃣</span>
                Repeat the cycle until you reach your goal
              </li>
              <li className="flex items-start">
                <span className="mr-2">3️⃣</span>
                Rest when needed, but maintain consistency
              </li>
              <li className="flex items-start">
                <span className="mr-2">4️⃣</span>
                Increase intensity each cycle to progress
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
