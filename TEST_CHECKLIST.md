# Quick Test Checklist for Deployed App

## URL: https://projetosaastreino82.vercel.app/

### ✅ Pre-Deployment Checks

1. **Verify next.config.ts was updated:**
   - Should NOT have `output: 'export'` line
   - Should only have `images` configuration

2. **Git commit message should be:**
   - "fix: enable API routes by removing static export config"

3. **Vercel deployment should show:**
   - "Build Result: Ready"
   - No errors in build logs
   - Functions tab should list `/api/gerar-treino`

---

### ✅ Testing Steps (Do this after deployment)

#### Step 1: Access the Form
```
URL: https://projetosaastreino82.vercel.app/anamnese
```
- [ ] Page loads correctly
- [ ] All form fields are visible
- [ ] No console errors (F12 → Console)

#### Step 2: Fill Out the Form
Use this test data:
```
Name: Test User
Age: 25
Height: 175
Weight: 70
Category: Hypertrophy (Hipertrofia)
Level: Intermediate (Intermediário)
Location: Gym (Academia)
Activity Level: Moderate
Available Days: 4
Time per Workout: 60 minutes
Sleep Quality: Good
Stress Level: Moderate
Nutrition: Good
(Fill other fields as needed)
```

- [ ] All fields accept input
- [ ] Dropdowns show options
- [ ] Checkboxes work
- [ ] Required fields validation works

#### Step 3: Submit the Form
- [ ] Click "GENERATE MY FREE WORKOUT" button
- [ ] Redirects to `/dashboard` automatically
- [ ] No error messages

#### Step 4: Check Browser Console
Open DevTools (F12) and check console logs:

**Expected logs:**
```
💾 Saving to localStorage: {nome: "Test User", idade: 25, peso: 70, ...}
📊 Data: {nome: "Test User", idade: 25, peso: 70, altura: 175, objetivo: "hipertrofia", ...}
📋 Loaded user data: {nome: "Test User", categoria: "hipertrofia", nivel: "intermediario", ...}
```

- [ ] Logs appear without errors
- [ ] Data shows correct field names (Portuguese)
- [ ] No undefined values

#### Step 5: Generate Workout on Dashboard
- [ ] Click "GENERATE MY FREE WORKOUT" button
- [ ] Button shows "Generating..." state
- [ ] After ~1 second, success message appears
- [ ] No error alerts

**Expected console logs:**
```
🧠 Generating workout with LOCAL AI (INSTANT)...
📥 Received form data: {...}
👤 User: Test User | Objective: hipertrofia | Level: intermediario
✅ Workout generated INSTANTLY with local AI!
📊 Weeks: 12 | Days/Week: 7
```

- [ ] All logs appear
- [ ] No error messages
- [ ] Network request succeeds (status 200)

#### Step 6: Verify Workout Display
After successful generation:
- [ ] Shows "Workout Generated Successfully!" message
- [ ] Displays weeks count (should be 12 or 1 for abs challenge)
- [ ] Shows days per week (should be 7)
- [ ] Shows exercises per day (should be 6-8)
- [ ] Download button appears

#### Step 7: Check Network Tab
Open DevTools → Network tab:

**Look for the API call:**
- Request URL: `https://projetosaastreino82.vercel.app/api/gerar-treino`
- Method: POST
- Status: 200 OK
- Response: Contains `success: true` and `treino` object

- [ ] Request exists
- [ ] Status is 200 (not 404 or 500)
- [ ] Response has workout data
- [ ] No failed requests

#### Step 8: Download PDF
- [ ] Click download button
- [ ] PDF generates successfully
- [ ] Opens in new tab or downloads
- [ ] Contains user name and workout details

---

### ❌ If You See Errors

#### Error: "Error generating workout"

**Check:**
1. Network tab - what's the status code?
   - 404 = API route not found (deployment issue)
   - 400 = Missing required fields (data issue)
   - 500 = Server error (code issue)

2. Browser console - what's the error message?
   - Look for red error messages
   - Check stack trace

3. Vercel logs - any deployment errors?
   - Go to Vercel dashboard
   - Check deployment logs
   - Check function logs

**Common Solutions:**
- Clear browser cache: Ctrl+Shift+Delete
- Hard refresh: Ctrl+Shift+R
- Wait 2-3 minutes for deployment to complete
- Redeploy if necessary

#### Error: "Missing required fields"

**Check localStorage:**
```javascript
// In browser console:
console.log(JSON.parse(localStorage.getItem('anamneseData')))
```

**Should show:**
```json
{
  "nome": "Test User",
  "idade": 25,
  "peso": 70,
  "altura": 175,
  "categoria": "hipertrofia",
  "nivel": "intermediario",
  "localTreino": "academia"
}
```

If fields are missing or have wrong names, the form fix wasn't deployed correctly.

---

### ✅ Success Criteria

Your deployment is successful when:

1. ✅ Form submits without errors
2. ✅ Dashboard receives user data correctly
3. ✅ Workout generation completes successfully
4. ✅ No console errors
5. ✅ Network request returns 200 OK
6. ✅ PDF downloads correctly
7. ✅ All data displays in Portuguese correctly

---

### 📸 Screenshot Checklist

Take screenshots of:
1. ✅ Filled form
2. ✅ Browser console showing successful logs
3. ✅ Network tab showing 200 OK response
4. ✅ Dashboard with workout displayed
5. ✅ Downloaded PDF

These help with debugging if issues occur!

---

### 🚀 Deployment Command

```bash
cd "c:\Users\devjo\Desktop\SISTEMAS WEB\ia de treino\treinamento-esportivo"
git add .
git commit -m "fix: enable API routes and fix form field names"
git push origin main
```

Then wait ~3 minutes for Vercel deployment to complete before testing.

---

**Good luck! Your system should now work perfectly! 🎉**
