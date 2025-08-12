# Smart Do Journey

A modern, intelligent task management application built with React, TypeScript, and Supabase, featuring AI-powered priority suggestions and a beautiful, responsive interface.

## 🚀 Features

- **Task Management**: Create, edit, delete, and organize tasks with ease
- **AI-Powered Priority Suggestions**: Get intelligent task prioritization recommendations
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Updates**: Live synchronization with Supabase backend
- **Authentication**: Secure user authentication and profile management
- **Theme Switching**: Light and dark mode support
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## 🏗️ Project Structure

```
smart-do-journey1/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Auth, etc.)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── integrations/   # External service integrations
│   │   ├── pages/          # Application pages
│   │   ├── types/          # TypeScript type definitions
│   │   └── lib/            # Utility functions
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── server/                 # Backend services
│   └── gemini-server.js    # AI service integration
└── supabase/               # Database and functions
    ├── functions/          # Edge functions
    └── config.toml         # Supabase configuration
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **React Router** - Client-side routing

### Backend
- **Supabase** - Open-source Firebase alternative
- **PostgreSQL** - Reliable database
- **Edge Functions** - Serverless backend functions
- **Gemini AI** - AI-powered task prioritization

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd smart-do-journey1
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the `client` directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## 🚀 Development

### Start Frontend Development Server
```bash
cd client
npm run dev
```
The application will be available at `http://localhost:5173`

### Start Backend Server
```bash
cd server
npm start
```

### Build for Production
```bash
cd client
npm run build
```

## 🔧 Available Scripts

### Frontend (client/)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (server/)
- `npm start` - Start the server
- `npm run dev` - Start in development mode

## 🌐 Environment Variables

### Frontend (.env)
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (.env)
```env
GEMINI_API_KEY=your_gemini_api_key
PORT=3000
```

## 📱 Key Components

- **TodoApp**: Main task management interface
- **AuthButtons**: Authentication controls
- **ProfileModal**: User profile management
- **ResponsiveSidebar**: Navigation sidebar
- **TaskEditDialog**: Task creation and editing
- **ThemeSwitcher**: Light/dark mode toggle

## 🔐 Authentication

The application uses Supabase authentication with:
- Email/password login
- Social authentication (configurable)
- Protected routes
- User profile management

## 🎨 UI Components

Built with shadcn/ui components including:
- Buttons, inputs, and forms
- Modals and dialogs
- Navigation components
- Data display components
- Utility components

## 📊 Database Schema

The application uses Supabase with the following main tables:
- `tasks` - Task information and metadata
- `profiles` - User profile data
- `priorities` - Task priority levels

## 🚀 Deployment

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables in your hosting platform

### Backend Deployment
1. Deploy to your preferred hosting service (Vercel, Netlify, etc.)
2. Set environment variables
3. Configure CORS settings

### Supabase Setup
1. Create a new Supabase project
2. Run the database migrations
3. Configure authentication settings
4. Set up edge functions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing issues
2. Create a new issue with detailed information
3. Contact the development team

## 🔮 Roadmap

- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Team collaboration features
- [ ] Integration with external tools
- [ ] Advanced AI features

---

**Built with ❤️ using modern web technologies**
