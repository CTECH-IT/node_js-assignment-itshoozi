const { MessageEmbed } = require(`discord.js`)
module.exports = {
    name: "give",
    description: "give money to someone",
    options: [
        {
            name: "user",
            description: "who are you going to give money to",
            type: "USER",
            required: true
        },
        {
            name: "amount",
            description: "Amount of coins to give them",
            type: "NUMBER",
            required: true
        }
    ],
    async execute(interaction, client, db) {
        const userTwo = interaction.options.getUser("user").id
        const userTwoAmount = db.get(`${userTwo}.money`)
        const userOneAmount = db.get(`${interaction.member.user.id}.money`)
        const amount = interaction.options.getNumber("amount")

        if (amount > userOneAmount) {
            const embed = new MessageEmbed()
            embed.setTitle("Give")
            embed.setDescription(`That's embarressing... you can't afford to give $${amount} to <@${userTwo}>...`)
            embed.setColor("#ffff00")
            embed.setTimestamp()
            return await interaction.reply({ embeds: [embed] })
        } else {
            db.add(`${interaction.member.user.id}.money`, -amount) // change the total for the person giving
            db.add(`${userTwo}.money`, amount) // give money to new user

            const embed = new MessageEmbed()
            embed.setTitle("Give")
            embed.setDescription(`wow ur so rich and nice you gave <@${userTwo}> a whopping $${amount}`)
            embed.setColor("#ffff00")
            embed.setTimestamp()
            return await interaction.reply({ embeds: [embed] })
        }
    }
} //oh lol