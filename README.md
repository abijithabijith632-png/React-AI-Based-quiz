# 🤖 AI-Based Quiz Web Application

An AI-powered full-stack quiz application that dynamically generates multiple-choice questions based on a user-selected topic and difficulty level using the OpenRouter API.

---

## 🚀 Features

* 📝 Custom topic input
* 🎚 Difficulty selection (Easy / Medium / Hard)
* 🤖 AI-generated 5 multiple-choice questions
* ✅ 4 options per question
* 📊 Automatic score calculation
* 🎉 Result display screen
* 🔐 Secure backend API key handling
* 🌐 Full frontend-backend integration

---

## 🛠 Tech Stack

### Frontend

* React.js
* HTML
* CSS
* JavaScript (ES6)

### Backend

* Node.js
* Express.js
* node-fetch (v2)
* dotenv
* CORS

### AI Integration

* OpenRouter Chat Completions API
* Model: `openai/gpt-3.5-turbo`

---

## 📂 Project Structure

```
react-ai-quiz/
│
├── server/
│   ├── server.js
│   ├── package.json
│   ├── .env
│
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/react-ai-quiz.git
cd react-ai-quiz
```

---

### 2️⃣ Install Frontend Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Backend

```bash
cd server
npm install
npm install node-fetch@2
```

---

### 4️⃣ Create `.env` File (Inside server folder)

Create a `.env` file inside the `server` folder and add:

```
OPENROUTER_API_KEY=your_api_key_here
```

⚠️ Important:

* Do NOT push `.env` to GitHub
* Ensure `.env` is added to `.gitignore`

---

### 5️⃣ Run Backend Server

```bash
node server.js
```

Backend runs at:

```
http://localhost:5000
```

---

### 6️⃣ Run Frontend

Open a new terminal in the main project folder:

```bash
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🧠 How It Works

1. User enters topic and selects difficulty
2. Frontend sends a POST request to the backend
3. Backend generates an AI prompt
4. Backend calls OpenRouter API
5. AI returns quiz questions in JSON format
6. Backend parses and sends structured data to frontend
7. Frontend displays questions and calculates score

---

## 🔐 Security

* API key stored securely using environment variables
* Backend handles all AI API requests
* API key never exposed to frontend
* `.env` excluded from version control

---

## 🛠 Challenges Faced

* Resolved CORS issues
* Fixed `fetch is not a function` error (using node-fetch v2)
* Corrected invalid model configuration
* Handled AI JSON parsing issues
* Debugged frontend-backend communication errors

---

## 📈 Future Improvements

* Add timer per question
* Improve UI with modern styling (Tailwind CSS / Material UI)
* Store quiz history in database
* Add authentication system
* Deploy application (Vercel + Render)
* Add leaderboard feature

---

## 🎯 Learning Outcomes

* Full-stack web development
* REST API integration
* AI API usage
* Environment variable security
* JSON parsing and validation
* Real-world debugging
* Git & GitHub version control

---

## 🏆 Conclusion

This project demonstrates the integration of AI-powered dynamic content generation into a full-stack web application. It showcases secure backend handling, frontend rendering, and practical debugging experience.

