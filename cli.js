#!/usr/bin/env node

const fs = require("fs");
const meow = require('meow');
const chalk = require('chalk');
const Listr = require('listr');
const { Observable } = require('rxjs');
const opn = require('better-opn');
const clipboardy = require('clipboardy');
const { Octokit } = require("@octokit/rest");

const settingsHandler = require("./src/settings")

const cli = meow(`
	${chalk.bold("Usage")}
		$ gistash <single|multiple file>
	
	${chalk.bold("Options")}
		-p, --public     Set GitHub gist as public (default: false)
		-c, --copy       Copy GitHub gist url to clipboard (default: false)
		-o, --open       Open GitHub gist url in browser
		-m, --message    GitHub gist description
		-v, --version    gistash CLI version
		-h, --help       Showing all available commands
`, {
	flags: {
		public: {
			type: 'boolean',
			alias: 'p',
			default: false
		},
		copy: {
			type: 'boolean',
			alias: 'c',
			default: false
		},
		open: {
			type: 'boolean',
			alias: 'o',
			default: false
		},
		message: {
			type: 'string',
			alias: 'm',
			default: "Upload using 'gistash' 👉🏻 https://github.com/mittalyashu/gistash"
		},
		help: {
			type: 'boolean',
			alias: 'h',
			default: false
		}
	}
});

const filesInput = cli.input;

const {
	public,
	copy,
	open,
	message,
	help
} = cli.flags;

(async () => {
	if (!filesInput && help) {
		console.log(cli.help);
		process.exit(1);
	}

	const settings = {
		...(await settingsHandler.get())
	}

	const octokit = new Octokit({
		auth: settings.token
	});

	let rawFile = {};
	let gist;
	const tasks = new Listr([
		{
			title: "Reading",
			task: async () => {
				return new Observable(observer => {
					for (let i = 0; i < filesInput.length; i++) {
						const fileNameArray = filesInput[i].split("/")
						const fileName = fileNameArray[fileNameArray.length - 1]
						observer.next(filesInput[i]);

						file = fs.readFileSync(filesInput[i], 'utf8')
						rawFile[`${fileName}`] = {
							content: file
						}
					}
					observer.complete();
				});
			}
		},
		{
			title: "Uploading",
			task: async () => {
				const data = await octokit.gists.create({
					files: rawFile,
					description: message,
					public
				})

				try {
					gist = data.data
				} catch (error) {
					throw new Error(`${chalk.red("Something unexpected happened!!!")}`);
				}
			}
		},
		{
			title: "Opening url in browser",
			skip: () => !open,
			task: () => {
				opn(gist.html_url)
			}
		},
		{
			title: "Copy url to clipboard",
			skip: () => !copy,
			task: () => {
				clipboardy.writeSync(gist.html_url);
			}
		}
	]);

	tasks.run()
})();