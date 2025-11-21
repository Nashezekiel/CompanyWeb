# 🌐 Starlink Global Network - E-commerce Platform

## 🚀 Overview
A modern, responsive e-commerce platform for Starlink Global Network, showcasing internet services, products, and solutions. Built with React, TypeScript, and modern web technologies.

## ✨ Features

### 🛍️ E-commerce Features
- **Product Catalog**: Browse and filter Starlink hardware and services
- **Product Details**: Detailed views with specifications and pricing
- **Responsive Design**: Works on all devices from mobile to desktop
- **Dark/Light Mode**: Automatic theme switching based on system preferences

### 🌐 Key Pages
- **Home**: Showcase of featured products and services
- **Products**: Comprehensive list of available Starlink hardware
- **Services**: Internet service plans and professional installation
- **About**: Company information and values
- **Contact**: Get in touch with the team

### 🛠️ Technical Stack
- **Frontend Framework**: React 18 with TypeScript, bundled by Vite for lightning-fast dev/build cycles
- **Routing**: React Router 6 (SPA mode with nested routes + dynamic params)
- **Styling & Theming**: Tailwind CSS 3, custom CSS variables, shadcn/ui utilities, Radix UI primitives, and Lucide React icons
- **State & Data**: React Context API for global state, React Query-ready data hooks, and lightweight custom hooks
- **Animations & UX polish**: Framer Motion, custom ScrollReveal utility, and Tailwind-powered transitions
- **Server / API Layer**: Express server (Vite SSR entry) sharing types via `shared/` for type-safe endpoints
- **Forms & Validation**: React Hook Form + Zod schemas for robust client-side validation (ready for future forms)
- **Testing & Tooling**: Vitest, Testing Library, ESLint, Prettier, and pnpm workspace scripts
- **Build & Deployment**: `pnpm build` (multi-step client/server build) ready for Vercel, Netlify, or containerized deployment

## 🏗️ Project Structure

```
client/
├── components/     # Reusable UI components
├── pages/         # Page components
├── data/          # Static data and mock database
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and helpers
└── styles/        # Global styles and theme
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or pnpm

### Installation
1. Clone the repository
   ```bash
   git clone [repository-url]
   cd zenith-garden
   ```

2. Install dependencies
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Start the development server
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🛠️ Build & Deployment

### Build for Production
```bash
pnpm build
# or
npm run build
```

### Preview Production Build
```bash
pnpm preview
# or
npm run preview
```

## 🎨 Theming & Styling

### Customizing Theme
The application uses Tailwind CSS with custom theming. To modify colors, fonts, or other design tokens, edit the `tailwind.config.ts` file.

### Adding New Components
1. Create a new component in the `components` directory
2. Use the existing design system and Tailwind classes
3. Export the component from the `index.ts` file

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the amazing build tooling
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Lucide](https://lucide.dev/) for beautiful icons
