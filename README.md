# adx-mailer

adx-mailer is s simplistic implementation of a mail sender using nodemailer for NodeJS.

## Installation

- Clone the repository with `git clone git@github.com:adx-project/adx-mailer.git`

- Use `npm install` in the project's root directory to install its dependencies

- Fill the required SMTP configuration variables in the `.env.example` file and rename it to `.env` 
(the .env files **MUST NOT** be committed to a version control system)

- Run `npm start`

The application should start listening in port 5000. 

**Note:** You can change the listening port by adding a `PORT` property to 
the `.env` file

## Usage

You can send emails by making requests to `POST {{host}}/send` endpoint. i.e:

`POST localhost:5000/send`

### Parameters

The required parameters depends on the template being used. The standard one, included in 
this code requires the following parameters to be added to the request in an **`x-www-form-urlencoded`**

- **firstName**:string
- **lastName**:string
- **email**:string
- **subject**:string the reason for contacting, normally predefined values set in the contact form (i.e Collaboration, Report an AO, ...)
- **skills**:string list of proposed skills in case of collaboration
- **profile**:string LinkedIn (or similar) profile of the user contacting ADX

Join the project at [The ADX Project](https://adxproject.org).