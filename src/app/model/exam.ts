import {User} from './user';

export interface Exam {
  id: number;
  name: string;
  startedDate: Date;
  minutes: number;
  participants?: [User];
  quiz?: any;
}
