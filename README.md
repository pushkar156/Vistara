# Vistara 🧭  
### Your Personal Career Counselor

Vistara is a web-based application designed to help students and early professionals explore, understand, and plan their career paths effectively. The platform provides structured guidance, personalized career roadmaps, and insights into skills, roles, and industry trends, helping users make informed career decisions.

---

## 🚀 Project Overview

Choosing the right career path is often confusing due to a lack of clarity, guidance, and reliable information. Vistara aims to solve this problem by acting as a digital career counselor that helps users:

- Discover suitable career paths based on interests and skills  
- Understand required skills and learning paths  
- Explore career growth, opportunities, and trends  
- Plan actionable steps toward their career goals  

This project focuses on clarity, simplicity, and structured guidance rather than overwhelming users with generic advice.

--- 

## ✨ Key Features

### 🔍 Career Exploration
Explore multiple career domains and roles with clear descriptions, responsibilities, and expectations.

### 🗺️ Personalized Career Roadmaps
Get step-by-step learning paths including required skills, tools, technologies, and recommended resources.

### 📊 Career Insights
Understand industry demand, growth trends, and general salary expectations for different career roles.

### 🧠 Interactive Guidance
Answer simple questions to receive tailored career recommendations based on interests and strengths.

### 🔐 Secure Authentication
User authentication powered by Firebase, allowing users to save and revisit their career journeys securely.

---

## 🛠️ Tech Stack

| Category | Technology |
|--------|------------|
| Frontend | Next.js (React) |
| Styling | Tailwind CSS, ShadCN UI |
| Language | TypeScript |
| Backend & Auth | Firebase |
| AI Integration | Google Gemini (via Genkit) |

---

## ⚙️ How It Works

1. User signs up or logs in securely  
2. Optional questionnaire gathers interests and preferences  
3. Career paths are suggested based on inputs  
4. Users explore career details and learning roadmaps  
5. Progress and preferences are saved for future sessions  

---

## 🧑‍💻 Installation & Setup

### Prerequisites
- Node.js (v18 or above recommended)
- npm or yarn
- Firebase account

---

### Clone the Repository

```bash
git clone https://github.com/pushkar156/Vistara.git
cd Vistara
```

---

### Install Dependencies

```bash
npm install
# or
yarn install
```

---

### Firebase Configuration

Create a Firebase project and enable Authentication.

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## ▶️ Running the Application

```bash
npm run dev
# or
yarn dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## 📁 Project Structure

```text
Career-Compass/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Application pages
│   ├── firebase/        # Firebase configuration
│   ├── styles/          # Global styles and themes
│
├── public/              # Static assets
├── README.md
├── package.json
├── next.config.ts
└── tailwind.config.ts
```

---

## 🔮 Future Enhancements

- AI-powered career assessment and profiling  
- Resume builder and resume review  
- Interview preparation and mock interviews  
- Job listing and internship integration  
- Community mentorship and networking features  

---
