<h1 align="center">
    Onami Bot
</h1>

<h3 align=center>A simple bot built with <a href=https://github.com/discordjs/discord.js>discord.js v14</a></h3>

## Installation
```
git clone https://github.com/Tiaansu/onami-bot.git
```
after cloning, run an
```
npm install
```
to snag all of the dependencies. Of course, you need [node](https://nodejs.org/en/) installed. I also strongly recommend [nodemon](https://www.npmjs.com/package/nodemon) as it makes testing *much* easier.

## Setting Up

First, you need to rename `.env.example` file to `.env` and then fill-up the field.
```
TOKEN="YOUR_BOT_TOKEN"
MONGODB_URI="YOUR_MONGODB_LOGIN_CONN"
BETA_STATUS="false"
BETA_TOKEN="YOUR_BETA_BOT_TOKEN"
```
Visit the [Discord Developer Portal](https://discord.com/developers/applications) to create an app and use the client token you are given for the `TOKEN` option. To set up your database go to [MongoDB](https://cloud.mongodb.com/) and create an account and choose their free tier. 

## License

Released under the [MIT](https://opensource.org/licenses/MIT) license.

## Credits
* **Tiaansu** - [github](https://github.com/Tiaansu)