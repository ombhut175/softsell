declare module 'langchain/prompts' {
  export class PromptTemplate {
    constructor(options: { template: string; inputVariables: string[] });
    format(values: Record<string, string>): Promise<string>;
  }
}

declare module '@langchain/openai' {
  export interface ChatOpenAIOptions {
    openAIApiKey: string;
    modelName?: string;
    temperature?: number;
    maxTokens?: number;
  }

  export interface ChatMessage {
    role: string;
    content: string;
  }

  export class ChatOpenAI {
    constructor(options: ChatOpenAIOptions);
    invoke(messages: any[]): Promise<{ content: string | object }>;
  }
} 