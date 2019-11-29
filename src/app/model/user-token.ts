import {Role} from './role';

export interface UserToken {
  id: number;
  username: string;
  password: string;
  token?: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  roles: Role[];
}
