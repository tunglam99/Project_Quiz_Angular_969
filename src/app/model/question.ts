export interface Question {
  id: number;
  content: string;
  status: boolean;
  correctAnswer: string;
  typeOfQuestion?: any;
  category?: any;
  quiz?: any;
}
