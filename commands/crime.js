const { MessageEmbed } = require(`discord.js`)

const blockedUsers = []

let timeInMinutes = 1;

module.exports = {
    name: "crime",
    description: "commit a naughty crime, but be careful you might lose money!",
    async execute(interaction, client, db) {
        if (blockedUsers.includes(interaction.member.user.id)) return interaction.reply({embeds: [new MessageEmbed().setTitle("Woah watch it! Wait a little bit before trying again.").setColor("#ff0000").setTimestamp()]})
        const currentBal = db.get(`${interaction.member.user.id}.money`)
        const success = Math.round(Math.random() * (2 - 1) + 1)
        const earned = Math.floor(Math.random() * (500 - 100)) + 100;
        
        if (success == 1) {
            db.add(`${interaction.member.user.id}.money`, earned)
            const embed = new MessageEmbed()
            embed.setTitle("Crime")
            embed.setDescription(`You commited a crime and earned $${earned} you have $${currentBal + earned}`)
            embed.setColor("#ffff00")
            embed.setTimestamp()
            return await interaction.reply({embeds: [embed]})
        } else {
            db.add(`${interaction.member.user.id}.money`, -earned)
            const embed = new MessageEmbed()
            embed.setTitle("Crime")
            embed.setDescription(`You commited a crime and got caught! You lost $${earned} you have $${currentBal - earned}. What's the point of commiting a crime if you're gonna get caught.`)
            embed.setColor("#ffff00")
            embed.setTimestamp()
            return await interaction.reply({embeds: [embed]})
        }
        blockedUsers.push(interaction.member.user.id)
        setTimeout(() => {
            blockedUsers.splice(blockedUsers.indexOf(interaction.member.user.id), 1)
        }, timeInMinutes * 60000)

    }
    // finished
}