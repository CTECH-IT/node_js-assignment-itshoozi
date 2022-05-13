const { MessageEmbed } = require(`discord.js`)
module.exports = {
    name: "flip",
    description: "Flip a coin",
    options: [
        {
            name: "amount",
            description: "Amount of coins to flip",
            type: "NUMBER",
            required: true
        }
    ],
    async execute(interaction, client, db) {
        const amount = interaction.options.getNumber("amount")
        const currentBal = db.get(`${interaction.member.user.id}.money`)
        const status = Math.round(Math.random() * (2 - 1) + 1)
        const earned = amount * 2
        if (amount > currentBal) {
            const embed = new MessageEmbed()
                embed.setTitle("Coinflip")
                embed.setDescription(`L you cant afford that`)
                embed.setColor("#ffff00")
                embed.setTimestamp()
                return await interaction.reply({embeds: [embed]})
        } else {
            if (status === 1) {
                db.set(`${interaction.member.user.id}.money`, currentBal + earned)
                const embed = new MessageEmbed()
                embed.setTitle("Coinflip")
                embed.setDescription(`You won and doubled your money! You have $${currentBal + earned}`)
                embed.setColor("#ffff00")
                embed.setTimestamp()
                return await interaction.reply({embeds: [embed]})
            } else {
                db.set(`${interaction.member.user.id}.money`, currentBal - amount)
                const embed = new MessageEmbed()
                embed.setTitle("Coinflip")
                embed.setDescription(`L you lost, you now have $${currentBal - amount}`)
                embed.setColor("#ffff00")
                embed.setTimestamp()
                return await interaction.reply({embeds: [embed]})
            }
        }
    }
} //oh lol