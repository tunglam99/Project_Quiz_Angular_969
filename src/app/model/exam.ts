import {User} from './user';

export interface Exam {
  id: number;
  name: string;
  startedDate: Date;
  minutes: Date;
  participants?: [User];
  quiz?: any;
}
