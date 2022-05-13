const { MessageEmbed } = require(`discord.js`)

const blockedUsers = []
const timeInMinutes = 1;

module.exports = {
    name: "work",
    description: "work and earn money",
    async execute(interaction, client, db) {
        if (blockedUsers.includes(interaction.member.user.id)) return interaction.reply({embeds: [new MessageEmbed().setTitle("You are on cooldown").setColor("#ff0000").setTimestamp()]})
        const currentBal = db.get(`${interaction.member.user.id}.money`)
        const earned = Math.floor(Math.random() * (1000 - 100)) + 100;
        db.add(`${interaction.member.user.id}.money`, earned)
        const embed = new MessageEmbed()
        embed.setTitle("Work")
        embed.setDescription(`You worked and earned $${earned} you have $${currentBal + earned}`)
        embed.setColor("#ffff00")
        embed.setTimestamp()
        blockedUsers.push(interaction.member.user.id)
        setTimeout(() => {
            blockedUsers.splice(blockedUsers.indexOf(interaction.member.user.id), 1)
        }, timeInMinutes * 60000)
        return await interaction.reply({embeds: [embed]})
    }
    // finished
}