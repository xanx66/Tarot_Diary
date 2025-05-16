# 🌙 TarotTales – A Guided Tarot Reflection Journal

TarotTales is a mindful journaling tool designed specifically for tarot readers who want to deepen their understanding of the cards, build intuitive connections, and reflect on their daily experiences. While the market is full of tarot decks and general journaling products, TarotTales uniquely blends the two. It offers a space to capture the _story behind the card_.

![TarotTales](https://github.com/username/tarottales/raw/main/client/public/preview.png)

## 📌 Project Status

**Current Status: In Development (Week 5)**

We've completed the following milestones:

- ✅ Designed the mystical UI with cosmic theme
- ✅ Built the landing page with radiant input field
- ✅ Created responsive header component with logo
- ✅ Set up modern React environment with Vite
- ✅ Implemented basic routing structure
- ✅ Modular API integration with axios and Vite proxy
- ✅ CORS setup for secure frontend-backend communication
- ✅ AI-powered tarot reading and chat (OpenAI integration)

Currently working on:

- 🔄 Daily card draw template
- 🔄 Journal entry input and storage
- 🔄 Tarot card database integration

**Note:**
- The AI chat and modular API are now live and stable for both web and app trial.
- The backend and frontend are fully decoupled and communicate securely via a modern, expandable API layer.
- Guest users can now access readings without logging in, while logged-in users get additional features.

## 💻 Tech Stack

- **Frontend**: React with Vite, React Router
- **UI**: Custom CSS with radiant borders, cosmic theme
- **Fonts**: Ojuju and Cormorant
- **Backend**: Node.js with Express
- **Database**: MongoDB for user data and journal entries
- **Authentication**: JWT (JSON Web Tokens)
- **AI Integration**: OpenAI API for tarot interpretations

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB account (for database)

### Installation

1. Clone the repository

```bash
git clone https://github.com/xanx66/Tarot_Diary.git
cd Tarot_Diary
```

2. Install backend dependencies

```bash
cd server
npm install
```

3. Install frontend dependencies

```bash
cd ../client
npm install
```

4. Set up environment variables

   - **Backend**: Create a `.env` file in the `server` directory and add:
     - Your MongoDB connection string as `MONGODB_URI`
     - Your JWT secret as `JWT_SECRET`
     - Your OpenAI API key as `OPENAI_API_KEY`
   - **Frontend**: For local development, you do **not** need to set `VITE_API_URL` in `.env` (leave it unset or blank). The Vite dev server will proxy API requests to the backend automatically.
   - For **production**, set `VITE_API_URL` in the frontend `.env.production` to your deployed backend URL (e.g., `VITE_API_URL=https://api.yourdomain.com`).

5. Run the development servers

```bash
# Start the backend (from server directory)
npm run dev

# Start the frontend (from client directory)
npm run dev
```

### CORS & API Communication
- The backend uses CORS middleware with a function to allow requests from `http://localhost:5173` and `http://localhost:3000` during development.
- The frontend uses axios with `withCredentials: true` and an interceptor to automatically attach the Bearer token if the user is logged in.
- **Do not** set any `Access-Control-Allow-*` headers in the frontend; these are handled by the backend.
- All API calls use relative URLs (e.g., `/api/ai/initial-reading`) in development, and the Vite proxy forwards them to the backend.

### Troubleshooting
- If you see CORS errors or 403 Forbidden errors:
  - Make sure your backend is running and accessible at the correct port (default: 5000 or 8000).
  - Ensure your frontend is running at `http://localhost:5173`.
  - Double-check that your backend CORS config uses a function for the `origin` option and includes your frontend's URL.
  - Do **not** set `VITE_API_URL` in `.env` for local development; let the Vite proxy handle API requests.
  - Restart both frontend and backend after changing any config.

## 🎯 Target Users

- **Beginner tarot readers** seeking structure and guidance in learning card meanings
- **Intermediate readers** wanting to document and track spreads and recurring themes
- **Spiritual/self-growth practitioners** interested in daily self-reflection and inner work
- **Journaling and stationery enthusiasts** who value beautifully designed, purposeful tools

## ✨ Planned Features

### 🃏 Daily Tarot Entry

- Input card(s) and reading context
- Guided reflection prompts
- Emotion/mood tagging

### 📚 Card Meaning Integration

- Reference upright/reversed meanings
- Personal meaning builder
- Track past encounters with the same card

### 📊 Insight & Trends

- Card frequency analysis
- Emotional trends and recurring symbols
- Reflection summary dashboard

### 🌀 Spread Library

- Built-in spreads (e.g. Past-Present-Future, Celtic Cross)
- Custom spread creation
- Save and annotate spreads

### 🔒 Privacy & Export

- Lock entries with passcode/Face ID
- Export to PDF for printing or archiving

## 🗓 Timeline

| **Week** | **Dates**       | **Milestone / Deliverable**                                                                                        | **Status**     |
| -------- | --------------- | ------------------------------------------------------------------------------------------------------------------ | -------------- |
| Week 1   | Apr 8 – Apr 14  | ✏️ Define core features, user stories, and layout sketches <br>🧠 Research tarot journaling habits & visual styles | ✅ Completed   |
| Week 2   | Apr 15 – Apr 21 | 🎨 Design UI wireframes in Figma <br>🔧 Set up project repo and development environment                            | ✅ Completed   |
| Week 3   | Apr 22 – Apr 28 | 💻 Implement daily card draw template <br>📝 Build basic journal entry input and storage                           | 🔄 In Progress |
| Week 4   | Apr 29 – May 5  | ✅ Modular API, CORS, and AI chat integration <br>📊 Develop spread tracker component <br>🌙 Add moon phases / visual elements | ✅ Completed   |
| Week 5   | May 13 – May 19 | 🧪 Conduct user testing with tarot readers <br>🪄 Refine features based on feedback <br>🔐 Implement optional authentication | 🔄 In Progress |
| Week 6   | May 20 – May 26 | 📁 Add instructional guide content <br>🔒 Address privacy considerations <br>📱 Mobile responsiveness improvements | ⏳ Planned     |
| Week 7   | May 27 – Jun 2  | 🖼️ Polish visuals, animations, and interactions <br>🧩 Prepare optional reference section or printable add-ons     | ⏳ Planned     |
| Week 8   | Jun 3 – Jun 9   | ✅ Finalize MVP for Stage 1 submission <br>📽️ Record demo video and update README                                  | ⏳ Planned     |

_Last updated: May 16, 2024_

## 📁 Project Structure

```
tarottales/
├── client/                  # Frontend (React + Vite)
│   ├── public/              # Static assets
│   │   └── background.jpg   # Cosmic background image
│   └── src/
│       ├── components/      # Reusable components
│       │   ├── Header.jsx   # App header with logo
│       │   └── LogoSVG.jsx  # SVG logo component
│       ├── pages/           # Page components
│       │   └── HomePage.jsx # Landing page
│       └── styles/          # CSS styles
│           ├── RadiantBorders.css  # Glow effect styles
│           └── HomePage.css # Homepage styling
├── server/                  # Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   └── utils/           # Helper utilities
│   └── .env                 # Environment variables
└── README.md                # This file
```

## 🧑‍🤝‍🧑 Team Contact

- **Fiona Wu** — itzsyboo@uw.edu
- **Annika An** — xanx5@uw.edu

## 🌟 Contributing

We welcome contributions to TarotTales! Please see our contribution guidelines for more information.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

_"Every card has a voice. What story does it tell you today?"_
