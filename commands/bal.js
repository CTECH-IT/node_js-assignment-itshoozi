const { MessageEmbed } = require(`discord.js`)

module.exports = {
    name: "bal",
    description: "check your balance and see how poor, i mean rich, you are",
    options: [
        {
            name: "user",
            description: "whoms balance do you want to see?",
            type: "USER",
            required: false
        }
    ],
    async execute(interaction, client, db) {
        if (interaction.options.getUser("user")) {
            const userTwo = interaction.options.getUser("user").id
            const totalAmount = db.get(`${userTwo}.money`)
            const embed = new MessageEmbed()
            embed.setTitle("Balance")
            embed.setDescription(`<@${userTwo}> has $${totalAmount}`)
            embed.setColor("#ffff00")
            embed.setTimestamp()
            return await interaction.reply({embeds: [embed]})
        } else {
            const totalAmount = db.get(`${interaction.member.user.id}.money`)
            const embed = new MessageEmbed()
            embed.setTitle("Balance")
            embed.setDescription(`you have $${totalAmount}`)
            embed.setColor("#ffff00")
            embed.setTimestamp()
            return await interaction.reply({embeds: [embed]})
        }
    }
    // finished
}