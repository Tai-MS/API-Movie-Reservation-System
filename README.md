# About this project

This project follows the idea of RoadMap.sh.
Here you can find all the details: [https://roadmap.sh/projects/movie-reservation-system](url)
Code written by: Taiel Sagretti (@Tai-MS).

With this project I want to show my skills on technologies that I haven't shown yet on my GitHub and push me into new tools for my backend role.

## Technological stack

![NodeJS](https://img.shields.io/badge/nodejs-black?logo=node.js) ![Typescript](https://img.shields.io/badge/Typescript-white?logo=Typescript) ![NestJS](https://img.shields.io/badge/NestJS-red?logo=nestjs) ![Prisma](https://img.shields.io/badge/Prisma-black?logo=Prisma) ![MySQL](https://img.shields.io/badge/MySQL-white?logo=mysql)

### Time of development

Project started at 11/09/2024.

### Getting started

```bash
git clone https://github.com/Tai-MS/API-Movie-Reservation-System
```

Move to the folder and install the dependencies

```bash
npm install
```

#### .ENV File

Your .env file should content the next variables:
`DATABASE_URL`
The value of `DATABASE_URL` must be similar to the next:
`mysql://<username>:<password>@<host>:<PORT>/<dbname>.`

### Tables and Database

Now, you must generate the tables with the following commands:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

_Note, the first command must be executen on an interactive environment as it is the terminal of VSC. It may not work on, for example, GitBash without previous configuration_
Those lines are going to create a migration folder and the tables indicated at the prisma.schema file.

### Execute the compiler

Now you are able to run the code using this line:

```bash
npm run start:dev
```

_Note: with that command you are running the code in --watch mode, which means that the TS compiler and Nest itself are looking into the code for any change on it to re-launch the host. If you don't want this, can run the next command instead:_

```bash
npm run start
```
