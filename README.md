# Podcast Community Client

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

- [Podcast Community Client](#podcast-community-client)
  - [Deployed at:](#deployed-at)
  - [Additional prerequisites (not including whats needed for create react app)](#additional-prerequisites-not-including-whats-needed-for-create-react-app)
  - [Setup](#setup)
  - [Development](#development)
  - [Linting](#linting)
    - [Workspace Settings](#workspace-settings)
    - [Flow](#flow)
    - [Husky](#husky)


## Deployed at:

* https://thru.the.ether.sebastiangerstelsollerman.me/ (master)
* https://dev.thru.the.ether.sebastiangerstelsollerman.me/  (dev)



## Additional prerequisites (not including whats needed for create react app)

* [docker](https://docs.docker.com/install/)



## Setup

This project is setup to run in a docker container you may however just use the regular yarn start.

To get the correct config firt run:

`cp src/Config/config.example.tsx src/Config/config.tsx`

then enter the url for you api and your JWT secret (same as the api).

It's recomended to run:

`yarr`
'yarn build-css'

or

`npm install`
`npm run build-css`

befor starting the container for the first time to bulid al the esential css files

Please start the docker container by following theese instructions in the [main repository](https://github.com/SebastianGerS/podcast-community)

note that this setup only has been tested on Mac OS



## Development

Changes in the ts and tsx files picked up by the `yarn start` process thats beeing run in the docker container it's hoverer necercary to listen for changes in the scss files and rebuild the css acordingly. this is done with

`yarn watch-css``

The comand can be run directly in this directory or inside the docker container (for me it seams a tiny bit faster to run it outside the container). If you wich to run it inside the container you must first set the correct binding for Node Sass inside the container by runing:

`docker exec -it ehter-dev-client npm rebuild node-sass --force`



## Linting

eslint and stylelint is used to lint this rpoject for the most part airbnb's style guide is adhered by check the .eslintrc for more details on what pluggins are used etc.

### Workspace Settings

Workspace settings found in .vscode/settings.json
If you are not using vs code please add corresponding settings for your editor.
It's also recomended to install the folowing plugins for vs code:

ESLint
stylelint
Prettier
Flow Language Suport

These plugins allong with the workspace settings will help you to auto-format
you code on save as well as give you tipps on how to writ better code

### Flow
To install flow on your machine:
brew install flow (for mac & linux)
npm install --global flow-bin (for windows)

### Husky
Precommit-hook added which runs eslint to check that the linting rules are beeing followed,
if there are any errors you will be forced to fix them befor you commit

