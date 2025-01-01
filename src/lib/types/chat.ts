export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatResponse {
  role: string;
  content: string;
}

export interface ChatError {
  error: string;
  status?: number;
}
