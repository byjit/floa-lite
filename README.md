# Floa lite 🤖

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![tRPC](https://img.shields.io/badge/tRPC-398CCB?logo=trpc&logoColor=white)](https://trpc.io/)

**The all-in-one AI Agent Chat Platform for all screens.**

Floa lite is designed to replace your Perplexity, ChatGPT, and Claude subscriptions with a unified, powerful, and extensible AI chat platform that works seamlessly across all devices.

## ✨ Features

- 🔄 **Multi-Provider Support**: Switch between different AI providers (OpenAI, Anthropic, Perplexity, Gemini, etc.)
- 📁 **RAG File Upload**: Upload files and get answers using Retrieval-Augmented Generation
- 🔌 **MCP Integration**: Connect any app/tool to your AI using Model Context Protocol
- 🌐 **Web Search**: Built-in web search capabilities powered by Perplexity
- 🎙️ **Voice Notes**: Record your thoughts and get answers or complete tasks using ElevenLabs
- 👥 **AI Personas**: Create multiple AI agents with different personalities and switch between them
- 📱 **Responsive Design**: Optimized for all screen sizes - from mobile to desktop
- 🎯 **Target Users**: Perfect for professionals, developers, and students

## 🛠️ Tech Stack

- **Frontend & Backend**: Next.js 15 with App Router
- **Database**: Turso LibSQL (SQLite) with Drizzle ORM
- **Authentication**: Google OAuth with better-auth
- **File Upload**: UploadThing
- **API**: tRPC for type-safe APIs
- **UI**: shadcn/ui components with Tailwind CSS
- **Deployment**: Optimized for Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Turso database account
- Google OAuth credentials
- API keys for your preferred AI providers

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prasanjit101/mchat.git
   cd mchat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables in `.env` (see [Environment Variables](#environment-variables) section)

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Your application will be running at `http://localhost:3000`

## 🔧 Environment Variables

Create a `.env` file in the root directory with the variables from `.env.example`

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbo
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format:check` - Check code formatting
- `npm run format:write` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking
- `npm run db:generate` - Generate database schema
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

### Development Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run the linter and type checker: `npm run check`
5. Commit your changes: `git commit -m 'feat: add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🛡️ Security

If you discover a security vulnerability, please read our [Security Policy](SECURITY.md) for information on how to report it responsibly.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/prasanjit101/mchat/issues)
- **Discussions**: [GitHub Discussions](https://github.com/prasanjit101/mchat/discussions)
- **Email**: prasanjitdutta45@gmail.com

## 🎯 Roadmap

- [ ] Implement home page
- [ ] Implement login page
- [ ] Implement agent chat page
- [ ] Implement dashboard page

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Database powered by [Turso](https://turso.tech/)
- Authentication by [better-auth](https://better-auth.com/)

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/prasanjit101">Prasanjit Dutta</a>
</div>

