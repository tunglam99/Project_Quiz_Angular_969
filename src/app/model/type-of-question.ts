import {Question} from './question';

export interface TypeOfQuestion {
  id: number;
  name: string;
  question?: Question[];
}
