const fs = require("fs");

const { configFilePath } = require("./globals");
const interactiveMode = require("./interactiveMode")

const getSettings = async (configLocation = configFilePath) => {
  let settings = {}
  try {
    if (fs.existsSync(configLocation)) {
      settings = await fs.readFileSync(configLocation, 'utf8');
      return JSON.parse(settings);
    } else {
      settings = {
        ...(await interactiveMode())
      }
      await fs.writeFileSync(configFilePath, JSON.stringify(settings))
      return settings
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  get: getSettings
}