export interface EssayWithEvaluation {
  id: string;
  prompt: string;
  content: string;
  evaluation?: EssayEvaluation;
}

export interface EssayEvaluation {
  overall_score: number;
  feedback: string;
}

export interface EssaySubmission {
  prompt: string;
  content: string;
} 