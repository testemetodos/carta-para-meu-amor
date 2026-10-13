export type Phase = 0 | 1 | 2 | 3 | 4;

export interface AppState {
  currentPhase: Phase;
  completedPhases: number[];
  collectedHearts: number;
  soundEnabled: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: 'choice' | 'text';
  options?: string[];
  correctIndex?: number;
  correctAnswers?: string[];
  successMessage: string;
  failureMessage: string;
}

export interface LoveReason {
  id: number;
  message: string;
  color: string;
  hint: string;
}
