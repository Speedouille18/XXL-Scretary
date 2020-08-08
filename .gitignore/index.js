const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
const fs = require('fs');
const message = require('./Events/message');
const { timeStamp } = require('console');

client.commands = new Discord.Collection();

client.login(process.env.TOKEN)

fs.readdir("./Commandes/", (error, f) => {
    if(error) console.log(error);

    let commandes = f.filter(f => f.split(".").pop() === "js");
    if(commandes.length <= 0) return console.log("Aucune commande trouvée");

    commandes.forEach((f) => {

        let commande = require (`./Commandes/${f}`)
        console.log(`${f} commande chargées !`);

    client.commands.set(commande.help.name, commande);
    });
});
fs.readdir("./Events/", (error, f) => {
    if(error) console.log(error);
    console.log(`${f.length} events en chargement`);
    
    f.forEach((f) => {
        const events = require(`./Events/${f}`);
        const event = f.split(".")[0];

    client.on(event, events.bind(null, client));
    });
});



client.on('channelCreate', channel => {

    const channelcreate = new Discord.MessageEmbed()
    .addField("Channel created:",` **__Channel name:__** ${channel.name} | ${channel.id} \n**__Guild name:__** ${channel.guild.name} | ${channel.guild.id} \n**__Owner of the guild:__** ${channel.guild.owner} | ${channel.guild.ownerID}`)
    .addField("Created at:",`**__Channel__**: ${channel.createdAt} \n**__Guild:__** ${channel.guild.createdAt}`)
    .setColor("RANDOM")
    
    client.channels.cache.get("740869982304469124").send(channelcreate)
})

client.on('channelDelete', channel => {

    const channeldelete = new Discord.MessageEmbed()
    .addField("Channel deleted:",` **__Channel name:__** ${channel.name} | ${channel.id} \n**__Guild name:__** ${channel.guild.name} | ${channel.guild.id} \n**__Owner of the guild:__** ${channel.guild.owner} | ${channel.guild.ownerID}`)
    .addField("Created at:",`**__Channel__**: ${channel.createdAt} \n**__Guild:__** ${channel.guild.createdAt}`)
    .setColor("RANDOM")

    client.channels.cache.get("740869982304469124").send(channeldelete)
})

client.on('messageDelete', message => {

    const messagedelete = new Discord.MessageEmbed()
    .addField("Message deleted:",`**__Message content:__** ${message.content} \n**__Guild name:__** ${message.guild.name} | ${message.guild.id} \n**__Channel name:__** ${message.channel.name} | ${message.channel.id} \n**__Owner of the guild:__** ${message.guild.owner} | ${message.guild.ownerID}`)
    .addField("Message user:",`User: ${message.author} | ${message.author.tag} | ${message.author.id}`)
    .addField("Created at:",`**__Guild:__** ${message.guild.createdAt} \n**__Channel:__** ${message.channel.createdAt}`)
    .setColor("RANDOM")

    client.channels.cache.get("740869982304469124").send(messagedelete)
})

client.on('message', message => {

    if(message.author.bot) {return}
    const message1 = new Discord.MessageEmbed()
    .addField("Message:",`**__Message content:__** ${message.content} \n**__Guild name:__** ${message.guild.name} | ${message.guild.id} \n**__Channel name:__** ${message.channel.name} | ${message.channel.id} \n**__Owner of the guild:__** ${message.guild.owner} | ${message.guild.ownerID}`)
    .addField("Message user:",`User: ${message.author} | ${message.author.tag} | ${message.author.id}`)
    .addField("Created at:",`**__Guild:__** ${message.guild.createdAt} \n**__Channel:__** ${message.channel.createdAt} \n**__User:__** ${message.author.createdAt}`)
    .setColor("RANDOM")

    client.channels.cache.get("740869982304469124").send(message1)
})

client.on('roleDelete', role => {

    const roledel = new Discord.MessageEmbed()
    .addField("Role was created on the guild:",`${role.guild.name} \n **__Founder:__** ${role.guild.owner} | ${role.guild.ownerID}`)
    .setColor("RANDOM")

    client.channels.cache.get("740869982304469124").send(roledel)
})
