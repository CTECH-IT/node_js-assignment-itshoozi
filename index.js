const { Client, Collection, MessageEmbed } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = require("quick.db")
const config = require("./config.json");
const fs = require("fs");
const client = new Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

client.login(config.BOT_TOKEN);

client.on("ready", () => {
    console.log("Ready!");
    console.log("Logged in as " + client.user.tag);
    client.user.setActivity("sleeping", {
        type: "dnd"
      });
    client.db = db;
    client.commands = new Collection();
    const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
    const commandData = [];
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
        commandData.push({
            name: command.name || file.slice(0, file.length - 3),
            description: command.description || "",
            options: command.options || []
        })
        console.log("Loaded command: " + command.name);
    }

    /*
    client.application.commands.set(commandData)
    
    */

    // set commands as guild commands for every guild, remove once bot is ready for production
    client.guilds.cache.forEach(gld => {
        gld.commands.set(commandData);
    })
})

client.on("messageCreate", (message) => {
    if(!["GUILD_TEXT", "GUILD_NEWS", "GUILD_NEWS_THREAD", "GUILD_PUBLIC_THREAD", "GUILD_PRIVATE_THREAD"].includes(message.channel.type)) return;
    const xpRandom = Math.floor(Math.random() * (10 - 1)) + 1; // amount of XP to add per message
    const currentXP = db.get(`${message.author.id}.xp`) // get current XP
    const xpToLevel = db.get(`${message.author.id}.xpToLevel`) // get current amount of xp to next level
    const level = db.get(`${message.author.id}.level`) // get the current level

    // if currentXP = xp to level, then set currentXP to 0, increase level, and set XPTOLEVEL like * random
    // if currentxp =/= xp to level, then add XP

    if (level == undefined ) { // you can just do !level which means if level is undeefined, false, null, 0 and etc
        db.set(`${message.author.id}.level`, 1) // add more xp
        db.add(`${message.author.id}.xp`, 15) // add more xp
        db.add(`${message.author.id}.xpToLevel`, 100) // add more xp
    } else if (currentXP + xpRandom > xpToLevel) {
        db.set(`${message.author.id}.xp`, 0) // add more xp
        db.set(`${message.author.id}.level`, level + 1) // add more xp
        db.add(`${message.author.id}.xpToLevel`, 250) // add more xp
    } else {
        db.set(`${message.author.id}.xp`, currentXP + xpRandom) // add more xp

    }


    // check if the message is sent in a counting channel
    // if counting channel, check if the number is same as current nummber
    // if yes add their username to "LAST COUNTED" and add 1 to the current number, and react
    // if no set last counted to smth else, then tell them they're failures, then set number to 1, and THEN react with X mark

    //this sets all variables to be good on first message

});


client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    if(!interaction?.guild) return await interaction.reply({embeds: [new MessageEmbed({title: `These are dms`, description: `Use commands on a server, dummy!`, color: `RED`})], ephemeral: true});
    const command = client.commands.get(interaction.commandName)
    if (!command) {
        const embed = new MessageEmbed()
        embed.setTitle("Command not found")
        embed.setDescription(`The command \`${command}\` was not found.`)
        embed.setColor("#ff0000")
        interaction.reply({ embeds: [embed], ephemeral: true});
        return;
    }
    try {
        command.execute(interaction, client, db);
    } catch(err) {
        const embed = new MessageEmbed({title: `Error`, description: `Error happened during command execution.\nCheck the console for more details.`, color: `RED`});
        if(interaction?.replied) {
            await interaction.editReply({embeds: [embed]})
        } else {
            await interaction.reply({embeds: [embed], ephemeral: true})
        }
        console.error(err);
    }
})