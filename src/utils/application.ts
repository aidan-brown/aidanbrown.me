import { WindowProps, WindowTransform } from 'components';

export type WindowGenerator = (
  initialTransform: WindowTransform,
  iconSrc: string,
  additionalProps?: {
    name: string;
    applications: Application[];
  }
) => WindowProps;

export type Application = {
  name: string;
  imageSrc: string;
  windowGeneratorFn: WindowGenerator;
  applications?: Application[];
};
