# 🎬 MoviMate

MoviMate is a Node.js-based movie search platform built using EJS templates and Firebase Authentication. Users can securely sign up or log in, land on a personalized dashboard, and search for movies using the OMDb API.

---

## 🌟 Features

- 🏠 Clean and interactive **Landing Page**
- 🔐 User **Sign-up & Login** using Firebase Authentication
- 🧾 **Dashboard** to search for movies by title
- 🔎 Movie search powered by the **OMDb API**
- 🎞️ Displays movie poster, title, genre, and ratings
- 🔐 Authenticated access to search functionality
- 🖥️ Server-side rendering using **EJS**

---

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js

**Frontend Templating:**
- EJS

**Authentication:**
- Firebase Authentication

**Movie Data API:**
- OMDb API

---

## 🔐 Authentication Flow

- Users register or log in using their email/password via Firebase.
- After successful login, users are redirected to a secure dashboard.
- Non-authenticated users are restricted from accessing the dashboard.

---

## 🔎 Movie Search Flow

- Dashboard includes a search bar where users can enter a movie title.
- Backend makes a request to the **OMDb API** using the title.
- Movie results are displayed with essential details like poster, plot, and ratings.

---

