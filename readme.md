<p align="center">
		<img src="./images/gistash-logo.png" alt="Gistash" height="72" />
</p>
<h1 align="center">
	Gistash
</h1>

<p align="center">
	Upload your local changes or stashed files to GitHub Gist.
</p>

<p align="center">
	<img src="https://badgen.net/badge/node/%3E=10/green" alt="Minimum Node.js version" />
	<a href="https://twitter.com/intent/follow?screen_name=mittalyashu77">
		<img src="https://img.shields.io/twitter/follow/mittalyashu77.svg?label=Follow%20@mittalyashu77" alt="Follow @mittalyashu77" />
	</a>
</p>

## 🧐 About

Gistash is a CLI tool that lets you save your local changes or stashed file to GitHub gist.

The whole concept of `git-stash` to stash the changes in a dirty working directory away.

There is no option to share your stashed file with other conbtributors.

## 💡 Features

* 🗂 Upload multiple files at once
* ⏱ Reports each step
* 🔒 Safely storing your GitHub token on your local machine
* 👀 Public or private gist
* 📋 Copy url to clipboard or open in browser
* ⛏ Maintained

## 🔰 Installation

**npm**

```
$ npm i -g gistash
```

**yarn**

```
$ yarn global add gistash
```

## 🚶🏻‍♂️ Usage

```
$ gistash --help

Upload your local changes or stashed files to GitHub Gist.

Usage
	$ gistash <single|multiple file>

Options
	-p, --public     Set GitHub gist as public (default: false)
	-c, --copy       Copy GitHub gist url to clipboard (default: false)
	-o, --open       Open GitHub gist url in browser
	-m, --message    GitHub gist description
	-v, --version    gistash CLI version
	-h, --help       Showing all available commands
```

**Example**

```
$ gistash ./hello-world.js --open --public
```

* Upload `hello-world.js` file
* Set gist to public using `--public`
* Open in browser with `--open`

## 🙏🏻 Credits

- [CodeCarrot](https://www.codecarrot.net/)