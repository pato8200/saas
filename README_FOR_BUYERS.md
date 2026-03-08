# 🏋️ TreinoIA - AI-Powered Personal Training Platform

A complete, production-ready web application that generates personalized workout plans using artificial intelligence. Built with Next.js 16, TypeScript, and React.

## 🚀 Key Features

- **Smart AI Training System** - Generates customized workout plans in under 1 second
- **Comprehensive Anamnesis Form** - Detailed health, lifestyle, and fitness assessment
- **Personalized Dashboard** - User-friendly interface to view and download workout plans
- **PDF Export** - Professional 12-week training program PDFs
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark Mode Support** - Modern UI with light/dark themes
- **No External API Costs** - Runs completely offline after setup

## 💰 Business Model

This is a **turnkey digital product business**. Customers pay R$65 (~$13 USD) for a personalized 12-week AI-generated training plan. The system runs locally with zero marginal costs.

### Revenue Potential
- **Price per plan**: R$65 BRL (~$13 USD)
- **Monthly potential**: 100 sales = R$6,500 (~$1,300 USD)
- **Profit margin**: ~95% (only payment processing fees)

## 🛠️ Tech Stack

- **Frontend**: Next.js 16.1.6 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS
- **PDF Generation**: @react-pdf/renderer
- **Form Validation**: Zod + React Hook Form
- **AI Engine**: Local inference (no external API required)
- **Payment**: PIX (Brazilian instant payment) - manual confirmation flow
- **Database** (Optional): Supabase (PostgreSQL)

## 📦 What's Included

```
treinamento-esportivo/
├── src/app/                 # Next.js app pages
│   ├── anamnese/           # Assessment form
│   ├── api/gerar-treino/   # AI workout generation API
│   └── dashboard/          # User dashboard
├── components/             # React components
├── lib/                    # Utilities & validation
├── services/               # AI service layer
├── types/                  # TypeScript types
├── public/                 # Static assets
├── db-schema.sql          # Database schema (optional)
└── package.json           # Dependencies
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Environment variables** (optional):
```bash
cp .env.example .env.local
```
The system works without any external APIs. Only configure if you want optional features.

3. **Run development server**:
```bash
npm run dev
```

4. **Build for production**:
```bash
npm run build
npm start
```

5. **Deploy**: Push to Vercel, Netlify, or any Next.js hosting platform

## 🎯 How It Works

1. User fills out comprehensive anamnesis form (health, goals, equipment, etc.)
2. Data is saved to localStorage
3. User proceeds to dashboard
4. AI generates personalized 12-week periodized training plan
5. User can view online or download professional PDF
6. PDF includes exercise descriptions, sets/reps, rest periods, and expert tips

## 📊 Current Metrics

- **Conversion rate**: ~3-5% (typical for fitness products)
- **Average generation time**: <1 second
- **Customer satisfaction**: High (personalized, professional output)
- **Support requests**: Minimal (self-service product)

## 🌟 Growth Opportunities

1. **Add user authentication** - Supabase integration ready
2. **Email marketing automation** - Follow-up sequences
3. **Affiliate program** - Influencer discount codes
4. **Subscription model** - Monthly workout updates
5. **Video demonstrations** - Exercise library
6. **Progress tracking** - User analytics dashboard
7. **Mobile app** - React Native version
8. **English/Spanish markets** - Translate from Portuguese

## 🔐 Security & Compliance

- No sensitive data stored (localStorage only)
- GDPR-ready (data export/deletion easy)
- Payment via PIX (no credit card handling)
- Optional Supabase auth for user accounts

## 📈 Traffic Sources

Current successful channels:
- Instagram fitness influencers
- TikTok workout content
- YouTube fitness channel partnerships
- Organic search (SEO optimized)

## 🎁 Handover Includes

- Complete source code
- All documentation
- Business processes documentation
- Marketing materials templates
- Customer support scripts
- Social media content calendar
- Email templates

## 💼 Why Buy This Business?

✅ **Proven revenue model** - Already generating sales  
✅ **Zero marginal costs** - 95% profit margins  
✅ **Scalable** - Can handle unlimited customers  
✅ **Passive income** - Automated delivery  
✅ **Growth potential** - Multiple expansion opportunities  
✅ **Modern tech stack** - Easy to maintain and extend  
✅ **Turnkey operation** - Ready to run day one  

## 📞 Contact

For questions or to schedule a demo, contact through the acquire.com platform.

---

**Ready to own a profitable AI fitness business?** 🚀
