const fs = require('fs');
const path = require('path');
const CONTENT_FOLDER = path.join(__dirname, 'src', 'fileContent');
const ROOT_FOLDER = path.join(CONTENT_FOLDER, 'root');

const getFileType = (fileName) => {
  if(fileName.includes('.dev') || fileName.includes('.com') || fileName.includes('.me') || fileName.includes('.net')) {
    return 'website';
  }
  if(fileName.includes('.jpg') || fileName.includes('.png')) {
    return 'picture';
  }
  if(fileName.includes('.mp3')) {
    return 'audio';
  }
  return 'file';
}

const readDirectory = (directoryPath) => {
  const fileNames = fs.readdirSync(directoryPath);
  const output = fileNames.map((fileName) => {
    const filePath = path.join(directoryPath, fileName);
    const isDirectory = fs.lstatSync(filePath).isDirectory();

    if (isDirectory) {
      return {
        name: fileName,
        path: `${filePath}`.split('src/')[1],
        files: readDirectory(filePath),
        type: 'directory'
      };
    }

    const name = fileName.split('.tsx')[0];

    return {
      name,
      path: `${filePath}`.split('src/')[1],
      type: getFileType(name)
    };
  });

  return output;
};

const output = {
  name: 'root',
  path: 'fileConent/root',
  files: readDirectory(ROOT_FOLDER),
  type: 'directory'
};
const outputJSON = JSON.stringify(output);
fs.writeFileSync(path.join(CONTENT_FOLDER, 'output.json'), outputJSON);
