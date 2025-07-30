# odin-wheres-waldo

### App Title: <ins>**_PixelHunt_**</ins>

This repository was made as a submission requirement to [The Odin Project](https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app)

![PixelHunt gameplay image](https://imgur.com/k52dORo.jpg)

## Live Demo

You can access the website here: https://odin-wheres-waldo.vercel.app/

## Features

This app was based on [Where's Waldo](https://en.wikipedia.org/wiki/Where%27s_Wally%3F) - a game where you need to find certain characters on a large image which often contains a huge amount of crowds. It features several key aspects including:

- A stopwatch timer to track completion
- A highscore list which are submitted anomymously
- Points are stored immediately in the database to avoid manipulation, and will prompt for a name before submitting.
- If user attempts to try again or quit, the score will be deleted otherwise.

## Installation

Clone this repository, and install the necessary modules by running this command in your command line that was relative to this file directory:

```
npm install
```

You can now run the app by executing this command. A URL link will be provided as an output which you need to access:

```
npm run dev
```

The backend of this app was located at [odin-wheres-waldo-api
](https://github.com/markpandan/odin-wheres-waldo-api). Make sure to run them side-by-side to ensure that it works.

## Components

This repository utilizes the following libraries and/or APIs:

- [React](https://react.dev/learn)
- [CSS Module](https://github.com/css-modules/css-modules)
