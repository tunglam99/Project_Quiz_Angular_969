import {Role} from './role';

export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  roles?: [Role];
}
