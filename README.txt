# EVX Frontend (React)

## 🚀 To run locally
1. Install dependencies:
   npm install

2. Start the development server:
   npm start

## 🌐 To deploy on Vercel
1. Push this folder to a GitHub repo
2. Go to https://vercel.com
3. Click "New Project" → import the repo
4. Accept defaults (React auto-detected)
5. Set environment variable if needed for backend URL

## ⚠️ Edit fetch URL
In `EligibilityTool.js`, make sure this line:
  fetch('http://localhost:3001/api/evaluate' ...

Is updated to match your Render backend URL (e.g. https://ev-backend.onrender.com/api/evaluate)
