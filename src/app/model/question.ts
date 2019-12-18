export interface Question {
id: number;
content: string;
status: boolean;
correctAnswer: string;
answers?: any[];
typeOfQuestion ?: any;
category ?: any;
}
