# SoftSell

A software license marketplace platform.

## Features

- Modern UI built with Next.js and Tailwind CSS
- Responsive design for all devices
- AI-powered customer support chat

## AI Chat Widget

The platform includes an AI-powered chat widget using Langchain. By default, it runs in "demo mode" with predefined responses to common questions. 

To enable the real OpenAI-powered chat:

1. Create a `.env.local` file in the root directory
2. Add your OpenAI API key: `NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here`
3. Restart the development server

The chat widget displays sample questions that users can click on, or they can type their own questions.

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.