const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const bot = new Discord.Client();

const TOKEN = 'MTE5MTMwNzIwMjI1MDY3ODMwMg.GUpmEO.fteGjUKVfmSk1Q8c5Ju-IfrUDKIFjT7xE1RzCI';
const PREFIX = '!';

bot.on('ready', () => {
    console.log(`${bot.user.tag} is online!`);
});

bot.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.substring(PREFIX.length).split(" ");
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'play':
            if (!args[0]) {
                message.channel.send('Please provide a link!');
                return;
            }
            if (!message.member.voice.channel) {
                message.channel.send('You need to be in a voice channel!');
                return;
            }
            const connection = await message.member.voice.channel.join();
            const stream = ytdl(args[0], { filter: 'audioonly' });
            connection.play(stream);
            message.channel.send(`Now Playing: ${args[0]}`);
            break;

        // Add more commands as needed
    }
});

bot.login(TOKEN);
