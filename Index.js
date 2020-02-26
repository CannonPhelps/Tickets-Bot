const config = require('./config.json')

const Discord = require('discord.js')

const client = new Discord.Client();


const ticket = new Discord.RichEmbed()
            .setTitle('Open A Ticket')
            .setColor('#b53235')
            .setDescription('Please Tell Us The Problem You Are Having!');

const help = new Discord.RichEmbed()
            .setTitle('Ticket Commands')
            .setColor('#b53235')
            .setDescription('List of commands')
            .addField('\u200b', '!new');

const prefix = (config.prefix)

client.on('ready', () => {
    client.channels.get("680316816156786694").send("Bot Active! Waiting to react to commands!")
    client.user.setActivity("Testing Bot", {type:"WATCHING"})
})


/*Commands*/
client.on('message', (message) => {
    if(message.guild.channels.exists(message.author.username)) {
    if(message.content == '!new') {

        message.channel.send(ticket).then(() => {
            const filter = m => m.content == '!new' || m.author.id === message.author.id;

            message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
            .then(collected => {
                message.channel.send(config.ticketOpen)
                message.guild.createChannel(message.author.username, { type: `text`, topic: collected.first().content.toLowerCase(), parent: config.category}).then(() => {
                    message.guild.channels.find(channel => channel.name === message.author.username)
                    
                    })
                })

             })
        }
    } else {
        message.reply(config.open)
        setTimeout(function(){
            message.delete(2)},
            3000);
        }
    
    
        })
    

client.login(config.token);

