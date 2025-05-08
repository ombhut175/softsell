'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from 'langchain/prompts';

// Use a mock API key by default (in production, use environment variables)
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'mock-api-key';
const IS_MOCK = OPENAI_API_KEY === 'mock-api-key' || !OPENAI_API_KEY;

// Sample questions that users might ask
const EXAMPLE_QUESTIONS = [
  'How do I sell my license?',
  'What payment methods do you accept?',
  'How long does delivery take?',
  'Can I get a refund?',
  'How do I contact support?'
];

// Mock responses for demo purposes
const MOCK_RESPONSES: Record<string, string> = {
  'how do i sell my license': 'To sell your license, go to your dashboard, click on "List New License", fill out the details, set your price, and publish the listing.',
  'what payment methods do you accept': 'We accept credit cards, PayPal, and bank transfers for most transactions.',
  'how long does delivery take': 'License keys are usually delivered instantly after payment confirmation. Physical items may take 3-5 business days.',
  'can i get a refund': 'Yes, we offer a 30-day money-back guarantee for most products. Please contact our support team for assistance.',
  'how do i contact support': 'You can reach our support team via email at support@softsell.com or through the contact form on our website.',
  'help': 'I can help with questions about selling licenses, payment methods, delivery, refunds, and contacting support. What would you like to know?',
  'hello': 'Hello! How can I assist you with SoftSell today?',
  'hi': 'Hi there! How can I help you with SoftSell today?',
};

interface Message {
  content: string;
  role: 'user' | 'assistant' | 'system';
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: 'You are a helpful customer support assistant for a software license marketplace called SoftSell. Keep your answers brief, friendly, and helpful.'
    },
    {
      role: 'assistant',
      content: 'Hi there! I\'m your SoftSell assistant. How can I help you today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to handle sending a message
  const handleSendMessage = async (content: string = inputValue) => {
    if (!content.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      if (IS_MOCK) {
        // Mocked response for demo purposes
        setTimeout(() => {
          // Default response if no match is found
          let responseText = 'I don\'t have specific information on that yet. Please contact our support team for more detailed assistance.';
          
          // Check for exact matches first (case insensitive)
          const normalizedQuery = content.toLowerCase().trim();
          if (MOCK_RESPONSES[normalizedQuery]) {
            responseText = MOCK_RESPONSES[normalizedQuery];
          } else {
            // Check for partial matches if no exact match
            for (const [question, answer] of Object.entries(MOCK_RESPONSES)) {
              if (normalizedQuery.includes(question)) {
                responseText = answer;
                break;
              }
            }
          }
          
          const assistantMessage: Message = { role: 'assistant', content: responseText };
          setMessages(prev => [...prev, assistantMessage]);
          setIsLoading(false);
        }, 1000);
      } else {
        // Real implementation using Langchain and OpenAI
        const model = new ChatOpenAI({ 
          openAIApiKey: OPENAI_API_KEY,
          modelName: 'gpt-3.5-turbo',
          temperature: 0.7
        });
        
        // Convert our messages to the format Langchain expects
        const langchainMessages = messages.map(msg => {
          if (msg.role === 'user') return { role: 'human', content: msg.content };
          if (msg.role === 'assistant') return { role: 'ai', content: msg.content };
          return { role: 'system', content: msg.content };
        });
        
        // Add the current user message
        langchainMessages.push({ role: 'human', content });
        
        // Call the model
        const response = await model.invoke(langchainMessages);
        
        // Add the assistant's response to our messages
        const assistantMessage: Message = { 
          role: 'assistant', 
          content: response.content.toString() 
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error calling AI service:', error);
      const errorMessage: Message = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error processing your request. Please try again later.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat widget */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-lg">
            <h3 className="font-semibold">SoftSell Support</h3>
            {IS_MOCK && <p className="text-xs mt-1 opacity-75">(Demo Mode)</p>}
          </div>

          {/* Messages container */}
          <div className="flex-1 p-3 overflow-y-auto max-h-80">
            {messages.filter(msg => msg.role !== 'system').map((message, index) => (
              <div
                key={index}
                className={`mb-3 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg max-w-[85%] ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-3">
                <div className="inline-block p-2 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Example questions */}
          <div className="px-3 pb-2">
            <p className="text-xs text-gray-500 mb-1">Suggested questions:</p>
            <div className="flex flex-wrap gap-1">
              {EXAMPLE_QUESTIONS.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(question);
                    handleSendMessage(question);
                  }}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded-full"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input area */}
          <div className="border-t p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 text-white rounded-r-lg px-4 py-2 hover:bg-blue-700 disabled:bg-blue-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 