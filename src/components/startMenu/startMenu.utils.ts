import { Application } from 'utils/application';

export type StartMenuProps = {
  isVisible: boolean;
  openWindowFn: (application: Application) => void;
  handleLogOut: () => void;
};
