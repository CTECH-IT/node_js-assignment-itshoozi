const { MessageEmbed } = require(`discord.js`)

module.exports = {
    name: "ping",
    description: "Shows the bot ping",
    async execute(interaction) {
        let client = interaction.client
        const embed = new MessageEmbed()
        embed.setTitle("Bot ping")
        embed.setDescription(`${client.ws.ping} ms`)
        embed.setColor("#ffff00")
        embed.setTimestamp()
        return await interaction.reply({embeds: [embed]})
    }
}