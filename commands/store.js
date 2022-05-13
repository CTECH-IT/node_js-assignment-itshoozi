const { MessageEmbed } = require(`discord.js`)

module.exports = {
    name: "store",
    description: "see items for sale",
    async execute(interaction) {
        let client = interaction.client
        const embed = new MessageEmbed()
        embed.setTitle("Store")
        embed.setDescription(`Apple - $5 \n Pizza - $10`)
        embed.setColor("#ffff00")
        embed.setTimestamp()
        return await interaction.reply({embeds: [embed]})
    }
}