const fs = require('fs');
const path = require('path');

const currentWorkingDir = process.cwd();
const [destination, duckName] = process.argv.slice(2);

if (!duckName) return console.log('duck has no name, Name the duck and try again');

const filename = 'index.js';
const testFilename = 'index.spec.js';
const duckTemplatePath = path.join(__dirname, filename);
const duckTestTemplatePath = path.join(__dirname, testFilename);
const reducerDir = path.join(currentWorkingDir, destination);
const reducersFilePath = path.join(reducerDir, 'index.js');
const duckDir = path.join(reducerDir, duckName);
const duckDestinationPath = path.join(duckDir, filename);
const duckTestDestinationPath = path.join(duckDir, testFilename);

if (fs.existsSync(duckDir)) return console.log(`${duckName} duck already exists`);

fs.mkdir(duckDir, err => {
  if (err) throw err;

  // create duck file
  fs.readFile(duckTemplatePath, (err, data) => {
    if (err) throw err;

    fs.writeFile(duckDestinationPath, data, (err) => {
      if (err) throw err;
    });
  });

  // create duck test file
  fs.readFile(duckTestTemplatePath, (err, data) => {
    if (err) throw err;

    fs.writeFile(duckTestDestinationPath, data, (err) => {
      if (err) throw err;
      console.log(`Created! ${duckName} duck`);
    });
  });

  if (!fs.existsSync(reducersFilePath)) return console.log('main reducer file does not exist');

// Update the reducer file
  fs.readFile(reducersFilePath, 'utf8', (err, data) => {
    const newFileWithImport = [`import ${duckName} from './${duckName}'`]
      .concat(data.split('\n'));

    const newFileWithReducerAppended = newFileWithImport
      .reduce((acc, x) => {
        return /combineReducers\(/.test(x)
          ? acc.concat([x, '  ' + duckName + ','])
          : acc.concat(x);
      }, []).join('\n');

    fs.writeFile(reducersFilePath, newFileWithReducerAppended, (err) => {
      if (err) throw err;
      console.log('Saved! new reducer file');
    });
  });
});


