import {User} from './user';

export interface Quiz {
  id: number;
  name: string;
  startedDate: Date;
  endedDate: Date;
  participants?: [User];
}
