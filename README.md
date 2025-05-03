# 🌙 TarotTales – A Guided Tarot Reflection Journal

TarotTales is a mindful journaling tool designed specifically for tarot readers who want to deepen their understanding of the cards, build intuitive connections, and reflect on their daily experiences. While the market is full of tarot decks and general journaling products, TarotTales uniquely blends the two. It offers a space to capture the _story behind the card_.

![TarotTales](https://github.com/username/tarottales/raw/main/client/public/preview.png)

## 📌 Project Status

**Current Status: In Development (Week 3)**

We've completed the following milestones:

- ✅ Designed the mystical UI with cosmic theme
- ✅ Built the landing page with radiant input field
- ✅ Created responsive header component with logo
- ✅ Set up modern React environment with Vite
- ✅ Implemented basic routing structure

Currently working on:

- 🔄 Daily card draw template
- 🔄 Journal entry input and storage
- 🔄 Tarot card database integration

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

   - Create `.env` file in the server directory
   - Add your MongoDB connection string and JWT secret
   - Add OpenAI API key if using AI features

5. Run the development servers

```bash
# Start the backend (from server directory)
npm run dev

# Start the frontend (from client directory)
npm run dev
```

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
| Week 4   | Apr 29 – May 5  | 📊 Develop spread tracker component <br>🌙 Add moon phases / visual elements                                       | ⏳ Planned     |
| Week 5   | May 6 – May 12  | 🧪 Conduct user testing with tarot readers <br>🪄 Refine features based on feedback                                | ⏳ Planned     |
| Week 6   | May 13 – May 19 | 📁 Add instructional guide content <br>🔒 Address privacy considerations                                           | ⏳ Planned     |
| Week 7   | May 20 – May 26 | 🖼️ Polish visuals, animations, and interactions <br>🧩 Prepare optional reference section or printable add-ons     | ⏳ Planned     |
| Week 8   | May 27 – June 6 | ✅ Finalize MVP for Stage 1 submission <br>📽️ Record demo video and update README                                  | ⏳ Planned     |

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
