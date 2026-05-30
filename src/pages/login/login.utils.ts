import { User } from 'utils/user';

export type LoginProps = {
  handleLogin: (user: User) => void;
};
