const fs = require("fs");

const { configFilePath } = require("./globals");
const interactiveMode = require("./interactiveMode")

let settings = {}

const getSettings = async (configLocation = configFilePath) => {
  try {
    if (fs.existsSync(configLocation)) {
      settings = await fs.readFileSync(configLocation, 'utf8');
      return JSON.parse(settings);
    } else {
      return await saveSettings();
    }
  } catch (error) {
    console.log(error);
  }
}

const saveSettings = async (configLocation = configFilePath) => {
  try {
    settings = {
      ...(await interactiveMode())
    }
    await fs.writeFileSync(configLocation, JSON.stringify(settings))
    return settings
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  get: getSettings,
  save: saveSettings
}