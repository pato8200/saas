# FIX: Workout Generation Not Matching Form Data

## 🐛 Problem Identified

The system was generating **generic hypertrophy workouts** instead of respecting the user's form inputs:

1. **User entered**: 21 years old, 193cm height, "treino de abvs" (abs workout)
2. **System generated**: Full hypertrophy program with wrong user data (Joao Paulo, 28 years, 175cm)

## 🔍 Root Cause

### Issue #1: Category Mapping Broken
- Form uses **English categories**: `abs_challenge`, `hypertrophy`, etc.
- Local AI expects **Portuguese categories**: `desafio_trincar_abdomen`, `hipertrofia`, etc.
- Mapping in form was incorrect: `'abs_challenge': 'saude'` → but `saude` doesn't exist in templates!

### Issue #2: Wrong Data Display
- System wasn't clearing old localStorage data
- Old/stale workout data was being shown instead of newly generated one

## ✅ Fixes Applied

### 1. Fixed Category Mapping (`src/app/anamnese/page.tsx`)
```typescript
// BEFORE (WRONG):
'abs_challenge': 'saude',  // ❌ 'saude' doesn't exist!
'shape_evolution': 'saude'

// AFTER (CORRECT):
'abs_challenge': 'desafio_trincar_abdomen',  // ✅ Maps to actual template
'shape_evolution': 'evoluir_shape'
```

### 2. Added Category Translation Layer (`services/local-ai.ts`)
```typescript
const categoryMap: Record<string, string> = {
  'hypertrophy': 'hipertrofia',
  'weight_loss': 'emagrecimento',
  'strength': 'forca',
  'endurance': 'resistencia',
  'abs_challenge': 'desafio_trincar_abdomen',
  'shape_evolution': 'evoluir_shape'
};

// Map from English (form) to Portuguese (templates)
let categoriaPortugues = categoryMap[formData.categoria] || formData.categoria || 'hipertrofia';
```

### 3. Updated Type Definitions (`types/anamnese.ts`)
- Now accepts both English AND Portuguese categories
- Added optional fields for all form inputs

### 4. Forced Regeneration (`dashboard/page.tsx`)
- Clears old workout when loading dashboard
- Prevents stale data from being shown

## 📋 How It Works Now

### User Flow:
1. **Form (English)** → User selects "Abs Challenge"
2. **Mapping** → Converts to `desafio_trincar_abdomen`
3. **Local AI** → Uses Portuguese template for abs-focused workout
4. **Result** → Generates 7-day abs challenge program ✅

### Example Mappings:
| Form Selection (English) | Internal Category (Portuguese) | Result |
|-------------------------|-------------------------------|--------|
| Hypertrophy | hipertrofia | Muscle gain program |
| Weight Loss | emagrecimento | Fat burning HIIT |
| Abs Challenge | desafio_trincar_abdomen | 7-day abs program |
| Shape Evolution | evoluir_shape | Aesthetic development |

## 🧪 Testing Instructions

### Test 1: Abs Challenge
1. Fill form with:
   - Name: Your name
   - Age: 21
   - Height: 193 cm
   - Goal: **"Abs Challenge"**
2. Submit and go to dashboard
3. Click "Generate Workout"
4. **Expected**: 7-day abs-focused program (NOT full body hypertrophy)

### Test 2: Other Goals
1. Try "Weight Loss" → Should generate HIIT/fat burning workouts
2. Try "Strength" → Should generate heavy compound movements
3. Try "Hypertrophy" → Should generate muscle building program

### Test 3: Data Accuracy
1. Check PDF shows YOUR entered data (name, age, height)
2. NOT generic data like "Joao Paulo, 28 years, 175cm"

## 🔧 Technical Changes

### Files Modified:
1. `src/app/anamnese/page.tsx` - Fixed category mapping
2. `services/local-ai.ts` - Added translation layer
3. `types/anamnese.ts` - Expanded type definitions
4. `src/app/dashboard/page.tsx` - Clear old data on load

### Key Code Changes:
```typescript
// local-ai.ts now maps categories automatically
let categoriaPortugues = categoryMap[formData.categoria];
const isAbdomenChallenge = categoriaPortugues === 'desafio_trincar_abdomen';
```

## ✅ Verification Checklist

After deploying:
- [ ] Abs challenge generates abs-only workouts
- [ ] Weight loss generates HIIT/cardio workouts
- [ ] Hypertrophy generates muscle-building workouts
- [ ] PDF shows correct user data (not stale data)
- [ ] Each generation produces different/unique workouts
- [ ] All 6 goal categories work correctly

## 🚀 Deployment

Changes are ready to deploy to Vercel:
```bash
git add .
git commit -m "fix: workout generation now respects form categories"
git push
```

## 📝 Notes

- System uses LOCAL AI (no external API needed)
- Workouts generated instantly (<1 second)
- Each generation is unique due to timestamp seed
- Abs challenge = 7 days only
- Other goals = 12 weeks periodization
