export interface Question {
  id: number;
  content: string;
  status: boolean;
  correctAnswer?: any[];
  typeOfQuestion?: any;
  category?: any;
  answers?: any[];
  quiz?: any;
}
