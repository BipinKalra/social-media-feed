# 🚀 foo-rum - Social Feed Application

A modern, full-featured social feed application built with React 18, TypeScript, and Tailwind CSS. This project demonstrates advanced frontend development practices including authentication flows, state management, animations, and performance optimization.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[Live Demo](https://social-media-feed-z2h4.vercel.app/)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BipinKalra/social-media-feed.git
   cd foo-rum
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Start exploring! 🎉

### Build for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be in the `dist` folder.

## ✨ Features

### 🔐 Authentication System
- **Dual Authentication Paths**: Modal popup for quick access + dedicated pages for focused experience
- **Protected Routes**: Automatically redirect unauthenticated users
- **Persistent Sessions**: Stay logged in across browser sessions
- **Form Validation**: Real-time validation with helpful error messages
- **Test Accounts**:
  - Email: `demo@example.com` | Password: `password123`
  - Email: `test@user.com` | Password: `testpass`

### 📝 Social Feed
- **Create Posts**: Intuitive post editor with emoji support
- **Real-time Updates**: See new posts appear instantly
- **Persistent Storage**: Posts saved locally (will sync with backend in production)
- **Interactive Elements**: Like, comment, and share buttons (UI ready for implementation)
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### 🎨 User Experience
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: Graceful error messages and fallbacks
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation
- **Performance**: Optimized Core Web Vitals (LCP, FID/INP, CLS)

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend Framework** | React 18 with TypeScript |
| **Styling** | Tailwind CSS (utility-first) |
| **Animations** | Framer Motion |
| **Routing** | React Router v6 |
| **State Management** | React Context API + Custom Hooks |
| **Data Persistence** | localStorage (backend-ready) |
| **Build Tool** | Vite |
| **Code Quality** | ESLint + Prettier |


## 📁 Project Structure

```
foo-rum/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── auth/           # Authentication components
│   │   │   ├── SignInForm.tsx
│   │   │   ├── SignUpForm.tsx
│   │   │   └── AuthModal.tsx
│   │   ├── feed/           # Feed-related components
│   │   │   ├── PostEditor.tsx
│   │   │   ├── PostCard.tsx
│   │   │   └── PostList.tsx
│   │   └── ui/             # Generic UI components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       └── Avatar.tsx
│   ├── context/            # React Context providers
│   │   └── AuthContext.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useDebounce.ts
│   │   ├── useModal.ts
│   │   └── useLocalStorage.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   ├── validation.ts
│   │   ├── sanitize.ts
│   │   └── storage.ts
│   ├── pages/              # Page components
│   │   ├── Feed.tsx
│   │   ├── SignIn.tsx
│   │   └── SignUp.tsx
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── package.json
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.ts          # Vite configuration
└── README.md
```

## 🐛 Known Issues & Limitations

### Current Limitations

1. **No Real Backend**
   - Authentication is simulated
   - Data stored only in localStorage
   - No data synchronization across devices

2. **Limited Functionality**
   - Like/comment/share buttons show alerts only
   - No image uploads yet
   - No user profiles

3. **Scalability**
   - Not optimized for 1000+ posts
   - Would need pagination/infinite scroll

### Planned Improvements

- [ ] Backend integration (Firebase/Supabase)
- [ ] Real-time post updates
- [ ] Image upload functionality
- [ ] Full comment system
- [ ] User profile pages
- [ ] Dark mode theme
- [ ] Email notifications
- [ ] Search functionality


