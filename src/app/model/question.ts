export interface Question {
  id: number;
  content: string;
  status: boolean;
  typeOfQuestion?: any;
  category?: any;
  answers?: any[];
  quiz?: any;
}
