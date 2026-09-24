export type AppMode = "learn" | "quiz" | "admin";

export interface WordItem {
  word: string;
  bopomofo: string[];
  emoji: string;
  age: number;
  color: string;
}

export interface QuizItem {
  character: string;
  answer: string;
  options: string[];
}

export interface AppState {
  mode: AppMode;
  appliedItems: WordItem[];
  workingItems: WordItem[];
  bookmarks: WordItem[];
  activeWords: WordItem[];
  currentWord: number;
  currentQuestion: number;
  score: number;
  selectedAnswer: string | null;
  quizOrder: QuizItem[];
  selectedAge: number;
  adminNotice: string;
}

export interface CustomWordInput {
  word: string;
  bopomofo: string;
  emoji: string;
}
