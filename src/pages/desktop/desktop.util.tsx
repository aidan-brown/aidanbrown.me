import { createContext } from 'react';

import { Directory } from '../subpages/directory';
import {
  audioIcon,
  fileIcon,
  folderIcon,
  pageIcon,
  pictureIcon
} from 'assets/images';
import { WindowTransform } from 'components';
import fileStructureData from 'fileContent/output.json';
import { Application } from 'utils/application';
import { User, USER_LOOKUP_TABLE } from 'utils/user';

type FileStructureData = {
  name: string;
  path: string;
  type: string;
  files?: FileStructureData[];
};

export type DesktopProps = {
  width: number;
  height: number;
  user: User;
  handleLogOut: () => void;
};

export const DesktopControl = createContext({
  handleWindowOpen: (application: Application, parentName?: string) => {},
  handleMultipleWindowOpen: (
    applications: Application[],
    appTransforms: WindowTransform[]
  ) => {},
  desktopScale: { w: 0, h: 0 },
  currentUser: USER_LOOKUP_TABLE.default,
  userFullDirectory: [] as Application[],
  fullAppList: [] as Application[]
});

/**
 * Joins the given strings together with a '/' between each string
 * @param params strings that are being joined
 * @returns a single string that represents a directory path for the inputted strings
 */
export const pathJoin = (...params: string[]) => params.join('/');

/**
 * Finds the starting directory given a single starting point and a target starting path
 * @param startingPath the target path of the starting directory
 * @param directory the current directory being evaluated
 * @returns a directory that has the given starting path
 */
const findStartingDirectory = (
  startingPath: string,
  directory: FileStructureData
): FileStructureData[] => {
  const path = startingPath.split('/');
  if (directory.name === path[path.length - 1]) {
    return directory.files!;
  }

  const nextDir = directory.files?.find((file) => path.includes(file.name));
  if (!!nextDir) {
    return findStartingDirectory(startingPath, nextDir);
  } else {
    throw new Error(`DIRECTORY NOT FOUND: ${startingPath}`);
  }
};

const getApplicationIcon = (type: string) => {
  switch (type) {
    case 'website':
      return pageIcon;
    case 'directory':
      return folderIcon;
    case 'picture':
      return pictureIcon;
    case 'audio':
      return audioIcon;
    default:
      return fileIcon;
  }
};

/**
 * Builds an application given a file path and name
 * @param file holds both the path to the file content and the name of the file
 * @returns an application based on the given file
 */
const buildApplication = async (
  file: FileStructureData
): Promise<Application> => {
  const windowGeneratorFn = await import(`../../${file.path}`);
  return {
    name: file.name,
    imageSrc: getApplicationIcon(file.type),
    windowGeneratorFn: windowGeneratorFn.default
  };
};

/**
 * Builds a directory application given a name and list of files it contains
 * @param file holds the name and list of files of the directory
 * @returns a directory application based off the given file
 */
const buildDirectory = async ({
  name,
  files
}: FileStructureData): Promise<Application> => {
  const applications = await Promise.all(
    files!.map(async (file): Promise<Application> => {
      const isDirectory = 'files' in file;
      if (isDirectory) {
        return await buildDirectory(file);
      }

      return await buildApplication(file);
    })
  );
  const directory: Application = {
    name,
    imageSrc: folderIcon,
    windowGeneratorFn: Directory,
    applications
  };

  return directory;
};

/**
 * Builds the directory tree based on a pre-generated JSON file
 * @param startingPath Optional - the current scene's base directory path
 * @returns an array of applications
 */
export const buildDirectoryFromData = async (
  startingPath?: string
): Promise<Application[]> => {
  const startingDir = !!startingPath
    ? findStartingDirectory(startingPath, fileStructureData)
    : [fileStructureData];

  const rootDir = await Promise.all(
    startingDir.map(async (file) =>
      'files' in file ? buildDirectory(file) : buildApplication(file)
    )
  );

  return rootDir;
};

export const buildAppListFromDirectory = (
  directory: Application[]
): Application[] => {
  const appList: Application[] = [];

  directory.forEach((app) => {
    if (app.name === 'REDACTED') {
      return;
    }

    if (!app.applications) {
      appList.push(app);
    } else {
      const subDirApps = buildAppListFromDirectory(app.applications);
      appList.push(...subDirApps);
    }
  });

  return appList;
};
