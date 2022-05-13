const { MessageEmbed } = require(`discord.js`)

module.exports = {
    name: "avatar",
    description: "get someones avatar",
    options: [
        {
            name: "user",
            description: "get someone elses avatar",
            type: "USER",
            required: false
        }
    ],
    async execute(interaction, client, db) {
        const currentXP = db.get(`${interaction.member.user.id}.xp`)
        if (interaction.options.getUser("user")) {
            const userTwo = interaction.options.getUser("user")
            const embed = new MessageEmbed()
            embed.setColor('#FFD700')
            embed.setImage(userTwo.displayAvatarURL({ dynamic: true, size: 512 }))
            return await interaction.reply({ embeds: [embed] })
        } else {
            const embed = new MessageEmbed()
            embed.setColor('#FFD700')
            embed.setImage(interaction.user.displayAvatarURL({ dynamic: true, size: 512 }))
            return await interaction.reply({ embeds: [embed] })
        }
    }
    // finished
}