import { Application } from 'utils/application';

export type IconGridProps = {
  applications: Application[];
  openWindowFn: (application: Application) => void;
};
