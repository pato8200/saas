import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { TreinoData, AnamneseFormData } from '../types/anamnese';

interface PdfTreinoProps {
  workoutPlan: TreinoData;
  anamneseData: AnamneseFormData & { categoria?: string };
}

const PdfTreino: React.FC<PdfTreinoProps> = ({ workoutPlan, anamneseData }) => {
  const styles = StyleSheet.create({
    // Cores e estilo base
    page: {
      backgroundColor: '#FFFFFF',
      padding: 40,
    },
    
    // Capa
    coverPage: {
      padding: 50,
      backgroundColor: '#FFFFFF',
    },
    topBar: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      height: 8,
      backgroundColor: '#FFD700',
    },
    orangeAccent: {
      position: 'absolute' as const,
      top: 0,
      right: 0,
      width: 150,
      height: 150,
      backgroundColor: '#FF8C00',
      opacity: 0.1,
    },
    badge: {
      backgroundColor: '#FFD700',
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 20,
      marginBottom: 30,
      alignSelf: 'center' as const,
    },
    badgeText: {
      fontSize: 10,
      fontWeight: '700',
      color: '#000000',
      textTransform: 'uppercase' as const,
      letterSpacing: 2,
    },
    title: {
      fontSize: 36,
      fontWeight: '900',
      color: '#FF8C00',
      marginBottom: 10,
      textAlign: 'center' as const,
    },
    subtitle: {
      fontSize: 12,
      color: '#666666',
      marginBottom: 40,
      textAlign: 'center' as const,
    },
    athleteBox: {
      backgroundColor: '#FFF9F0',
      borderLeftWidth: 4,
      borderLeftColor: '#FFD700',
      paddingVertical: 20,
      paddingHorizontal: 40,
      marginBottom: 30,
      alignItems: 'center' as const,
    },
    athleteName: {
      fontSize: 24,
      fontWeight: '700',
      color: '#1a1a1a',
    },
    infoRow: {
      flexDirection: 'row' as const,
      gap: 30,
      justifyContent: 'center' as const,
      marginTop: 20,
    },
    infoItem: {
      alignItems: 'center' as const,
    },
    infoValue: {
      fontSize: 16,
      fontWeight: '700',
      color: '#FFD700',
    },
    infoLabel: {
      fontSize: 9,
      color: '#999999',
      textTransform: 'uppercase' as const,
      marginTop: 4,
    },
    dotsRow: {
      flexDirection: 'row' as const,
      gap: 8,
      marginTop: 40,
      justifyContent: 'center' as const,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#FFD700',
    },
    dotActive: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#FF8C00',
    },
    
    // Páginas de treino
    workoutHeader: {
      marginBottom: 30,
      paddingBottom: 20,
      borderBottomWidth: 2,
      borderBottomColor: '#FFD700',
    },
    dayTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: '#FF8C00',
      marginBottom: 8,
    },
    dayLabel: {
      fontSize: 11,
      color: '#999999',
      textTransform: 'uppercase' as const,
      letterSpacing: 2,
    },
    progressBar: {
      height: 4,
      backgroundColor: '#FFF9F0',
      borderRadius: 2,
      marginTop: 15,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#FFD700',
    },
    exerciseItem: {
      marginBottom: 25,
      paddingBottom: 25,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    exerciseHeader: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      marginBottom: 10,
    },
    exerciseNumber: {
      fontSize: 18,
      fontWeight: '700',
      color: '#FFD700',
      marginRight: 12,
      minWidth: 30,
    },
    exerciseName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1a1a1a',
      flex: 1,
    },
    exerciseDetails: {
      flexDirection: 'row' as const,
      backgroundColor: '#FFF9F0',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 6,
      marginBottom: 10,
    },
    detailBox: {
      alignItems: 'center' as const,
      flex: 1,
    },
    detailValue: {
      fontSize: 13,
      fontWeight: '700',
      color: '#FF8C00',
    },
    detailLabel: {
      fontSize: 9,
      color: '#999999',
      textTransform: 'uppercase' as const,
      marginTop: 3,
    },
    detailSeparator: {
      width: 1,
      backgroundColor: '#FFD700',
      marginHorizontal: 10,
    },
    expertTip: {
      backgroundColor: '#FFFBF0',
      borderLeftWidth: 3,
      borderLeftColor: '#FF8C00',
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginTop: 8,
    },
    expertTipText: {
      fontSize: 10,
      color: '#666666',
      lineHeight: 1.6,
      fontStyle: 'italic',
    },
    footerNote: {
      fontSize: 9,
      color: '#CCCCCC',
      textAlign: 'center' as const,
      marginTop: 30,
    },
    
    // Página final
    guidePage: {
      padding: 50,
      backgroundColor: '#FFFFFF',
    },
    guideTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: '#FF8C00',
      marginBottom: 30,
      textAlign: 'center' as const,
    },
    stepContainer: {
      flexDirection: 'row' as const,
      marginBottom: 25,
      alignItems: 'flex-start' as const,
    },
    stepNumber: {
      fontSize: 24,
      fontWeight: '900',
      color: '#FFD700',
      marginRight: 15,
      minWidth: 40,
    },
    stepContent: {
      flex: 1,
    },
    stepTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: '#1a1a1a',
      marginBottom: 6,
    },
    stepDescription: {
      fontSize: 11,
      color: '#666666',
      lineHeight: 1.6,
    },
    infoBox: {
      backgroundColor: '#FFF9F0',
      borderLeftWidth: 4,
      borderLeftColor: '#FFD700',
      padding: 15,
      marginBottom: 20,
      borderRadius: 6,
    },
    infoBoxTitle: {
      fontSize: 12,
      fontWeight: '700',
      color: '#FF8C00',
      marginBottom: 8,
      textTransform: 'uppercase' as const,
    },
    infoBoxText: {
      fontSize: 11,
      color: '#666666',
      lineHeight: 1.6,
    },
    warningBox: {
      backgroundColor: '#FEF2F2',
      borderLeftWidth: 4,
      borderLeftColor: '#DC2626',
      padding: 15,
      marginTop: 30,
      borderRadius: 6,
    },
    warningTitle: {
      fontSize: 12,
      fontWeight: '700',
      color: '#DC2626',
      marginBottom: 8,
      textTransform: 'uppercase' as const,
    },
    warningText: {
      fontSize: 10,
      color: '#991B1B',
      lineHeight: 1.6,
    },
    pageNumber: {
      position: 'absolute' as const,
      bottom: 30,
      right: 50,
      fontSize: 10,
      color: '#CCCCCC',
    },
  });

  // Pegar apenas os primeiros 7 dias
  const allTrainingDays: Array<{
    dia: { dia: string; exercicios: any[] };
  }> = [];

  if (workoutPlan.semanas && workoutPlan.semanas.length > 0) {
    workoutPlan.semanas[0].divisaoSemanal?.forEach((dia) => {
      if (dia && dia.exercicios && Array.isArray(dia.exercicios)) {
        allTrainingDays.push({ dia });
      }
    });
  }

  const sevenDays = allTrainingDays.slice(0, 7);

  // Calcular idade a partir da data de nascimento
  const calculateAge = () => {
    if (!anamneseData.dataNascimento) return 0;
    const birthDate = new Date(anamneseData.dataNascimento);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Título baseado no objetivo
  const getObjectiveTitle = () => {
    const categoria = anamneseData.categoria?.toLowerCase() || '';
    
    const titles: Record<string, string> = {
      hipertrofia: 'DESAFIO HIPERTROFIA TOTAL',
      emagrecimento: 'DESAFIO QUEIMA EXTREMA',
      forca: 'DESAFIO FORÇA MÁXIMA',
      resistencia: 'DESAFIO RESISTÊNCIA ELITE',
      desafio_trincar_abdomen: 'DESAFIO ABDÔMEN TRINCADO',
      evoluir_shape: 'DESAFIO EVOLUIÇÃO DE SHAPE'
    };
    
    return titles[categoria] || 'DESAFIO TREINO COMPLETO';
  };

  return (
    <Document>
      {/* CAPA */}
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.topBar} />
        <View style={styles.orangeAccent} />
        
        <View style={styles.badge}>
          <Text style={styles.badgeText}>PROGRAMA DE 7 DIAS</Text>
        </View>
        
        <Text style={styles.title}>{getObjectiveTitle()}</Text>
        <Text style={styles.subtitle}>Complete os 7 dias e repita até atingir seu objetivo</Text>
        
        <View style={styles.athleteBox}>
          <Text style={{fontSize: 10, color: '#999999', textTransform: 'uppercase' as const, letterSpacing: 2, marginBottom: 6}}>ATLETA</Text>
          <Text style={styles.athleteName}>{anamneseData.nome || 'Atleta'}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{anamneseData.peso || 0}kg</Text>
            <Text style={styles.infoLabel}>PESO</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{anamneseData.altura || 0}cm</Text>
            <Text style={styles.infoLabel}>ALTURA</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{calculateAge()}</Text>
            <Text style={styles.infoLabel}>ANOS</Text>
          </View>
        </View>
        
        <View style={styles.dotsRow}>
          {[...Array(7)].map((_, i) => (
            <View key={i} style={i === 0 ? styles.dotActive : styles.dot} />
          ))}
        </View>
        
        <Text style={styles.footerNote}>Foco total no seu objetivo: {anamneseData.categoria?.toUpperCase() || 'HIPERTROFIA'}</Text>
        <Text style={{fontSize: 7, color: '#E5E5E5', textAlign: 'center' as const, marginTop: 4}}>Gerado em: {new Date().toLocaleString('pt-BR')}</Text>
      </Page>

      {/* TREINOS - Um por página */}
      {sevenDays.map((day, index) => (
        <Page key={`day-${index}`} size="A4" style={styles.page}>
          <View style={styles.workoutHeader}>
            <Text style={styles.dayTitle}>DIA {index + 1}</Text>
            <Text style={styles.dayLabel}>SEMANA ÚNICA • FOCO NO OBJETIVO</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${((index + 1) / 7) * 100}%` }]} />
            </View>
          </View>
          
          {day.dia.exercicios.map((exercicio: any, exIndex: number) => (
            <View key={exIndex} style={styles.exerciseItem}>
              <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseNumber}>{String(exIndex + 1).padStart(2, '0')}</Text>
                <Text style={styles.exerciseName}>{exercicio.nome || 'Exercício'}</Text>
              </View>
              
              <View style={styles.exerciseDetails}>
                <View style={styles.detailBox}>
                  <Text style={styles.detailValue}>{exercicio.series || '3'}</Text>
                  <Text style={styles.detailLabel}>SÉRIES</Text>
                </View>
                <View style={styles.detailSeparator} />
                <View style={styles.detailBox}>
                  <Text style={styles.detailValue}>{exercicio.repeticoes || '12'}</Text>
                  <Text style={styles.detailLabel}>REPS</Text>
                </View>
                <View style={styles.detailSeparator} />
                <View style={styles.detailBox}>
                  <Text style={styles.detailValue}>{exercicio.descanso || '60s'}</Text>
                  <Text style={styles.detailLabel}>DESCANSO</Text>
                </View>
              </View>
              
              {exercicio.dicaExpert && (
                <View style={styles.expertTip}>
                  <Text style={{fontSize: 10, color: '#FF8C00', marginBottom: 4}}>💡 DICA PRO:</Text>
                  <Text style={styles.expertTipText}>{exercicio.dicaExpert}</Text>
                </View>
              )}
            </View>
          ))}
          
          <Text style={styles.footerNote}>Dia {index + 1} de 7 • Complete todos para ver resultados</Text>
          <Text style={styles.pageNumber}>{index + 2}</Text>
        </Page>
      ))}

      {/* PÁGINA FINAL - Instruções */}
      <Page size="A4" style={styles.guidePage}>
        <Text style={styles.guideTitle}>🎯 COMO USAR ESTE PROGRAMA</Text>
        
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>01</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>COMPLETE OS 7 DIAS</Text>
            <Text style={styles.stepDescription}>
              Execute todos os 7 treinos em sequência. Descanse quando necessário, mas mantenha a consistência.
            </Text>
          </View>
        </View>
        
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>02</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>REPITA O CICLO</Text>
            <Text style={styles.stepDescription}>
              Após completar os 7 dias, reinicie o programa. Cada ciclo traz mais resultados e evolução!
            </Text>
          </View>
        </View>
        
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>03</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>PROGRIDRA SEMPRE</Text>
            <Text style={styles.stepDescription}>
              Aumente cargas, repetições ou intensidade a cada ciclo para continuar evoluindo constantemente.
            </Text>
          </View>
        </View>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>⏱️ TEMPO ESTIMADO</Text>
          <Text style={styles.infoBoxText}>4-6 semanas para ver resultados significativos. Resultados variam conforme dedicação e consistência.</Text>
        </View>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>🎯 OBJETIVO FOCADO</Text>
          <Text style={styles.infoBoxText}>
            Todos os exercícios foram selecionados especificamente para: {anamneseData.categoria?.toUpperCase() || 'TREINO PERSONALIZADO'}. 
            Este programa é 100% personalizado para seu objetivo.
          </Text>
        </View>
        
        {workoutPlan.notasSeguranca && workoutPlan.notasSeguranca.length > 0 && (
          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>⚠️ ATENÇÃO</Text>
            {workoutPlan.notasSeguranca.map((nota: string, index: number) => (
              <Text key={index} style={styles.warningText}>• {nota}</Text>
            ))}
          </View>
        )}
        
        <Text style={styles.pageNumber}>8</Text>
      </Page>
    </Document>
  );
};

export default PdfTreino;
