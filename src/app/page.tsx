"use client";

import Link from "next/link";
import { useState } from 'react';

export default function Home() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);

  const categories = [
    { id: 'hypertrophy', name: 'Hypertrophy', description: 'Increase your muscle mass efficiently' },
    { id: 'weight_loss', name: 'Weight Loss', description: 'Lose weight in a healthy and sustainable way' },
    { id: 'strength', name: 'Strength and Power', description: 'Develop brute strength and muscle explosion' },
    { id: 'endurance', name: 'Muscular Endurance', description: 'Improve your endurance and conditioning' },
    { id: 'abs_challenge', name: 'Abs Challenge', description: 'Specific goal for abdominal definition' },
    { id: 'shape_evolution', name: 'Shape Evolution', description: 'Improve your silhouette and body definition' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800">
      {/* Futuristic Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-amber-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
        </div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-gradient-to-r from-white to-yellow-100 text-transparent bg-clip-text">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                Transform your body with <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-200">AI-powered personalized workouts</span>
              </h1>
            </div>
            <p className="text-xl text-yellow-100 mb-10 max-w-2xl mx-auto font-light">
              We generate exclusive workout plans based on your characteristics, goals, and physical limitations
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="#categorias" 
                className="px-8 py-4 bg-white text-yellow-600 font-bold rounded-xl shadow-lg hover:bg-yellow-50 transition-all transform hover:scale-105 border-2 border-white hover:border-yellow-200"
              >
                Start now
              </Link>
              <Link 
                href="#como-funciona" 
                className="px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white hover:bg-white/10 transition-all"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" className="py-20 bg-gradient-to-b from-white to-yellow-50 dark:from-gray-800 dark:to-gray-800 my-8">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-16 tracking-tight">How it works?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition-all duration-300"></div>
              <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-yellow-100 dark:border-amber-900">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Fill out your profile</h3>
                <p className="text-gray-600 dark:text-gray-300">Provide your information, goals, and physical limitations</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition-all duration-300"></div>
              <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-yellow-100 dark:border-amber-900">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Receive your plan</h3>
                <p className="text-gray-600 dark:text-gray-300">Our AI generates a personalized plan for you</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition-all duration-300"></div>
              <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-yellow-100 dark:border-amber-900">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Train safely</h3>
                <p className="text-gray-600 dark:text-gray-300">Follow your plan and track your progress</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Futuristic Categories Section */}
      <section id="categorias" className="py-20 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 tracking-tight">Choose your category</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-16 text-lg">Select the goal that best fits you</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div 
                key={category.id}
                onClick={() => setCategoriaSelecionada(category.id === categoriaSelecionada ? null : category.id)}
                className={`cursor-pointer p-8 rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-105 ${
                  categoriaSelecionada === category.id 
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white ring-4 ring-yellow-300' 
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:shadow-xl border border-yellow-100 dark:border-amber-900'
                } relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <h3 className="text-2xl font-bold mb-3">{category.name}</h3>
                  <p className="text-base text-center">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {categoriaSelecionada && (
            <div className="mt-16">
              <Link 
                href={`/anamnese?categoria=${categoriaSelecionada}`}
                className="inline-block px-10 py-5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold rounded-2xl shadow-lg hover:from-yellow-500 hover:to-amber-600 transition-all transform hover:scale-105"
              >
                Continue to Health Assessment
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why It's Worth It Section - Convincing Arguments */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-amber-500 text-white">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Why is it worth it?</h2>
          <p className="text-xl mb-16 opacity-90 max-w-3xl mx-auto">Discover the benefits of accepting the body transformation challenge with us</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Personalized Workout</h3>
              <p className="text-yellow-100">Exclusive plans created based on your characteristics, goals, and physical limitations</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Advanced AI</h3>
              <p className="text-yellow-100">Our artificial intelligence constantly adapts your plan for better results</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Time Savings</h3>
              <p className="text-yellow-100">Get faster results with plans optimized for your body type and goals</p>
            </div>
          </div>
          
          <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 shadow-2xl">
            <h3 className="text-3xl font-bold mb-6">Accept the Transformation Challenge</h3>
            <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto">
              Our personalized workout plans increase exercise effectiveness by up to 73% compared to generic plans. 
              With continuous monitoring and intelligent adjustments, you'll see consistent and lasting results.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/anamnese"
                className="px-8 py-4 bg-white text-yellow-600 font-bold rounded-xl shadow-lg hover:bg-yellow-50 transition-all transform hover:scale-105"
              >
                Start your challenge now
              </Link>
              <Link 
                href="#categorias"
                className="px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white hover:bg-white/10 transition-all"
              >
                View categories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}