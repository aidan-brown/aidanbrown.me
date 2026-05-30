import { ollie, profile } from 'assets/images';

export type User = {
  name: string;
  password: string;
  profileImage?: string;
  backgroundImage?: string;
};

export const USER_LOOKUP_TABLE: { default: User; [key: string]: User } = {
  default: {
    name: 'AidanB',
    password: '',
    profileImage: profile,
    backgroundImage: ollie
  }
};
