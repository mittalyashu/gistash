const inquirer = require('inquirer');

module.exports = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'password',
      name: 'token',
      message: 'GitHub personal token'
      // todo: validate the token
    }
  ])

  return answers;
}