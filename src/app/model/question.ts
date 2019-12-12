import {TypeOfQuestion} from './type-of-question';

export interface Question {
id: number;
quiz: string;
answerA: string;
answerB: string;
answerC: string;
answerD: string;
correctAnswer: string;
typeOfQuestion ?: any;
}
