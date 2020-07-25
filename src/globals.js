const os = require('os');

const homeDirectory = os.homedir();
const configFileName = ".gistash.json"
const configFilePath = `${homeDirectory}/${configFileName}`;

module.exports = {
  homeDirectory,
  configFileName,
  configFilePath
}