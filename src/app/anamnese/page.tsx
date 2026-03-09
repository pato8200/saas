'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AnamnesePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    peso: '',
    altura: '',
    objetivo: '',
    nivel: '',
    localTreino: '',
    categoria: '',
    specificGoal: '',
    availableDays: '',
    timePerWorkout: '',
    workoutLocation: '',
    availableEquipment: [] as string[],
    injuryHistory: '',
    medicalConditions: '',
    medications: '',
    pastSurgeries: '',
    sleepQuality: '',
    sleepHours: '',
    stressLevel: '',
    nutrition: '',
    trainedBefore: '',
    mainMotivation: '',
    resultExpectations: '',
    temporaryLimitations: '',
    workoutPreferences: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // CRITICAL FIX: Map objective to categoria correctly
    const objetivoMap: Record<string, string> = {
      'hypertrophy': 'hipertrofia',
      'weight_loss': 'emagrecimento',
      'strength': 'forca',
      'endurance': 'resistencia',
      'abs_challenge': 'desafio_trincar_abdomen', // FIXED: Now maps to correct Portuguese category
      'shape_evolution': 'evoluir_shape'
    };
    
    const formDataComNivel = {
      ...formData,
      nome: formData.nome,
      idade: parseInt(String(formData.idade)) || 25,
      peso: parseFloat(String(formData.peso)) || 70,
      altura: parseFloat(String(formData.altura)) || 170,
      categoria: formData.categoria || 'hypertrophy', // Keep original category
      objetivo: objetivoMap[formData.categoria] || 'hipertrofia', // Map to Portuguese
      nivel: formData.nivel || 'intermediario',
      localTreino: formData.localTreino || 'academia'
    };
    
    console.log('💾 Saving to localStorage:', formDataComNivel);
    console.log('📊 Data:', {
      nome: formDataComNivel.nome,
      idade: formDataComNivel.idade,
      peso: formDataComNivel.peso,
      altura: formDataComNivel.altura,
      objetivo: formDataComNivel.objetivo,
      nivel: formDataComNivel.nivel,
      localTreino: formDataComNivel.localTreino
    });
    
    localStorage.setItem('anamneseData', JSON.stringify(formDataComNivel));
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Health Assessment Form</h1>
          <p className="text-center text-gray-600 mb-8">Fill in all the information below so we can create your personalized workout plan</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="idade" className="block text-sm font-medium text-gray-700 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    id="idade"
                    name="idade"
                    required
                    placeholder="e.g., 25"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="sexo" className="block text-sm font-medium text-gray-700 mb-1">
                    Biological Sex *
                  </label>
                  <select
                    id="sexo"
                    name="sexo"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="masculino">Male</option>
                    <option value="feminino">Female</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Body Measurements */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Body Measurements</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="altura" className="block text-sm font-medium text-gray-700 mb-1">
                    Height (cm) *
                  </label>
                  <input
                    type="number"
                    id="altura"
                    name="altura"
                    required
                    placeholder="e.g., 175"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="peso" className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    id="peso"
                    name="peso"
                    required
                    step="0.1"
                    placeholder="e.g., 70.5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Goal and Workout */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Goal and Workout</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
                    Main Category *
                  </label>
                  <select
                    id="categoria"
                    name="categoria"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="hypertrophy">Hypertrophy (Muscle Gain)</option>
                    <option value="weight_loss">Weight Loss (Fat Loss)</option>
                    <option value="strength">Strength and Power</option>
                    <option value="endurance">Muscular Endurance</option>
                    <option value="abs_challenge">Abs Challenge</option>
                    <option value="shape_evolution">Shape Evolution</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="specificGoal" className="block text-sm font-medium text-gray-700 mb-1">
                    Specific Goal
                  </label>
                  <input
                    type="text"
                    id="specificGoal"
                    name="specificGoal"
                    placeholder="e.g., Lose 5kg in 2 months"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-1">
                    Physical Activity Level *
                  </label>
                  <select
                    id="activityLevel"
                    name="activityLevel"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="sedentary">Sedentary (little or no activity)</option>
                    <option value="light">Light (1-2 times per week)</option>
                    <option value="moderate">Moderate (3-4 times per week)</option>
                    <option value="active">Active (5-6 times per week)</option>
                    <option value="very_active">Very Active (every day)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="nivel" className="block text-sm font-medium text-gray-700 mb-1">
                    Training Experience *
                  </label>
                  <select
                    id="nivel"
                    name="nivel"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="iniciante">Beginner (up to 6 months)</option>
                    <option value="intermediario">Intermediate (6 months - 2 years)</option>
                    <option value="avancado">Advanced (more than 2 years)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="availableDays" className="block text-sm font-medium text-gray-700 mb-1">
                    Available Days per Week *
                  </label>
                  <select
                    id="availableDays"
                    name="availableDays"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="1">1 day</option>
                    <option value="2">2 days</option>
                    <option value="3">3 days</option>
                    <option value="4">4 days</option>
                    <option value="5">5 days</option>
                    <option value="6">6 days</option>
                    <option value="7">7 days</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="timePerWorkout" className="block text-sm font-medium text-gray-700 mb-1">
                    Time Available per Workout *
                  </label>
                  <select
                    id="timePerWorkout"
                    name="timePerWorkout"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1h30</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="localTreino" className="block text-sm font-medium text-gray-700 mb-1">
                    Workout Location *
                  </label>
                  <select
                    id="localTreino"
                    name="localTreino"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="academia">Gym</option>
                    <option value="casa">Home</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Equipment (check all that you have access to)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['Bars', 'Dumbbells', 'Resistance Bands', 'Kettlebell', 'Treadmill', 'Bike', 'Pull-up Bar', 'Mat', 'Swiss Ball', 'Plyo Box', 'Medicine Ball', 'No Equipment'].map((equip) => (
                    <label key={equip} className="flex items-center">
                      <input
                        type="checkbox"
                        name="availableEquipment"
                        value={equip.toLowerCase()}
                        className="mr-2"
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const value = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            availableEquipment: checked
                              ? [...prev.availableEquipment, value]
                              : prev.availableEquipment.filter(eq => eq !== value)
                          }));
                        }}
                      />
                      <span className="text-sm text-gray-700">{equip}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Health and Medical History */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Health and Medical History</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="injuryHistory" className="block text-sm font-medium text-gray-700 mb-1">
                    Injury or Pain History
                  </label>
                  <textarea
                    id="injuryHistory"
                    name="injuryHistory"
                    rows={2}
                    placeholder="Describe current or past injuries, chronic pain, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700 mb-1">
                    Medical Conditions or Diseases
                  </label>
                  <textarea
                    id="medicalConditions"
                    name="medicalConditions"
                    rows={2}
                    placeholder="Diabetes, hypertension, heart problems, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="medications" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Medications
                  </label>
                  <textarea
                    id="medications"
                    name="medications"
                    rows={2}
                    placeholder="List medications you take regularly"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="pastSurgeries" className="block text-sm font-medium text-gray-700 mb-1">
                    Past Surgeries
                  </label>
                  <textarea
                    id="pastSurgeries"
                    name="pastSurgeries"
                    rows={2}
                    placeholder="List surgeries you've had and when they occurred"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Lifestyle */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Lifestyle and Nutrition</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sleepQuality" className="block text-sm font-medium text-gray-700 mb-1">
                    Sleep Quality *
                  </label>
                  <select
                    id="sleepQuality"
                    name="sleepQuality"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="excelente">Excellent</option>
                    <option value="boa">Good</option>
                    <option value="regular">Fair</option>
                    <option value="ruim">Poor</option>
                    <option value="muito_ruim">Very Poor</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="sleepHours" className="block text-sm font-medium text-gray-700 mb-1">
                    Hours of Sleep per Night *
                  </label>
                  <input
                    type="number"
                    id="sleepHours"
                    name="sleepHours"
                    required
                    min="1"
                    max="12"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="stressLevel" className="block text-sm font-medium text-gray-700 mb-1">
                    Daily Stress Level *
                  </label>
                  <select
                    id="stressLevel"
                    name="stressLevel"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="baixo">Low</option>
                    <option value="moderado">Moderate</option>
                    <option value="alto">High</option>
                    <option value="muito_alto">Very High</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="nutrition" className="block text-sm font-medium text-gray-700 mb-1">
                    Nutrition Quality *
                  </label>
                  <select
                    id="nutrition"
                    name="nutrition"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="excelente">Excellent</option>
                    <option value="boa">Good</option>
                    <option value="regular">Fair</option>
                    <option value="ruim">Poor</option>
                    <option value="muito_ruim">Very Poor</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sports History and Motivation */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">History and Motivation</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="trainedBefore" className="block text-sm font-medium text-gray-700 mb-1">
                    Have You Trained Before? *
                  </label>
                  <select
                    id="trainedBefore"
                    name="trainedBefore"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="nunca">Never trained</option>
                    <option value="treinou_antes">Trained before but stopped</option>
                    <option value="treina_atualmente">Currently training</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="mainMotivation" className="block text-sm font-medium text-gray-700 mb-1">
                    What is Your Main Motivation? *
                  </label>
                  <textarea
                    id="mainMotivation"
                    name="mainMotivation"
                    rows={2}
                    required
                    placeholder="What motivates you to start/continue training?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="resultExpectations" className="block text-sm font-medium text-gray-700 mb-1">
                    Result Expectations
                  </label>
                  <textarea
                    id="resultExpectations"
                    name="resultExpectations"
                    rows={2}
                    placeholder="What do you hope to achieve with this workout plan?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="temporaryLimitations" className="block text-sm font-medium text-gray-700 mb-1">
                    Temporary Limitations
                  </label>
                  <textarea
                    id="temporaryLimitations"
                    name="temporaryLimitations"
                    rows={2}
                    placeholder="Any temporary limitations we should consider?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="workoutPreferences" className="block text-sm font-medium text-gray-700 mb-1">
                    Workout Preferences
                  </label>
                  <textarea
                    id="workoutPreferences"
                    name="workoutPreferences"
                    rows={2}
                    placeholder="Do you have any preference for specific types of exercises or training methods?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:from-yellow-600 hover:to-amber-700 transition-all transform hover:scale-105"
            >
              🎯 GENERATE MY FREE WORKOUT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnamnesePage;