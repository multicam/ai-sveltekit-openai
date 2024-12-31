# AI SvelteKit OpenAI Chat Application

A modern chat application built with SvelteKit and OpenAI's GPT API.

## Features

- Real-time chat interface with OpenAI's GPT models
- TypeScript support for better type safety
- Modern and responsive UI
- Error handling and loading states
- Modular and maintainable code structure

## Project Structure

```
src/
├── lib/
│   ├── components/    # Reusable Svelte components
│   ├── services/     # External service integrations
│   └── types/        # TypeScript type definitions
├── routes/
│   ├── api/          # API endpoints
│   └── ...           # Page routes
```

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type-check the codebase
- `npm run lint` - Lint the codebase
- `npm run format` - Format the codebase

## Technologies Used

- SvelteKit
- TypeScript
- OpenAI API
- Vite
