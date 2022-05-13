const { MessageEmbed } = require(`discord.js`)
module.exports = {
    name: "reset",
    description: "reset your balance",
    async execute(interaction, client, db) {
        db.set(`${interaction.member.user.id}.money`, 0)
        db.set(`${interaction.member.user.id}.xp`, 0)
        db.set(`${interaction.member.user.id}.xpToLevel`, 0)
        db.set(`${interaction.member.user.id}.level`, 0)
        const embed = new MessageEmbed()
        embed.setTitle("reset")
        embed.setDescription(`You reset your balance back to 0!`)
        embed.setColor("#ffff00")
        embed.setTimestamp()
        return await interaction.reply({embeds: [embed]})
    }
    // finished
}