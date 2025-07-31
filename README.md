# Eduardo Enriquez Portfolio

A modern portfolio web application built with **React**, **Redux Toolkit**, **Vite**, **TypeScript**, and **Tailwind CSS**. Includes admin features, project management, and user authentication.

## 🚀 Project Structure

```
/
├── public/
│   ├── favicon.svg
│   └── projects/
│       ├── dino-lab.webp
│       ├── forecast-weather.webp
│       └── skull-game.webp
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── setupTests.ts
│   ├── assets/
│   │   ├── moon.svg
│   │   └── sun.svg
│   ├── components/
│   │   ├── admin/
│   │   ├── common/
│   │   ├── home/
│   │   ├── icons/
│   ├── layouts/
│   ├── pages/
│   │   └── admin/
│   │       └── projects/
│   ├── services/
│   ├── store/
│   │   └── slices/
│   ├── types/
│   └── utils/
├── .env
├── .env.local
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.mjs
├── jest.setup.js
├── cypress.config.ts
└── README.md
```

## 🛠️ Tech Stack

- **React** & **TypeScript**
- **Redux Toolkit** for state management
- **Vite** for fast development/build
- **Tailwind CSS** for styling
- **Jest** & **React Testing Library** for unit tests
- **Cypress** for end-to-end testing

## 📦 Setup & Development

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Start development server:**

   ```sh
   npm run dev
   ```

   The app runs at `http://localhost:5173` by default.

3. **Build for production:**

   ```sh
   npm run build
   ```

4. **Preview production build:**
   ```sh
   npm run preview
   ```

## 🧪 Testing

- **Unit tests:**
  ```sh
  npm run test
  ```
- **E2E tests (Cypress):**
  ```sh
  npm run cypress
  ```

## 🗂️ Key Features

- Admin dashboard for managing projects and users
- Project CRUD operations
- File upload for project covers
- Notifications and error handling
- Responsive design

## 📄 Environment Variables

Configure `.env` and `.env.local` for API endpoints and secrets.

## 🤝 Contributing

Feel free to open issues or submit PRs!

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
