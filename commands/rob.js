const { MessageEmbed } = require(`discord.js`)
module.exports = {
    name: "rob",
    description: "rob someone",
    options: [
        {
            name: "user",
            description: "who are you going to rob",
            type: "USER",
            required: true
        }
    ],
    async execute(interaction, client, db) {
        const userTwo = interaction.options.getUser("user").id
        const userTwoAmount = db.get(`${userTwo}.money`)
        const userOneAmount = db.get(`${interaction.member.user.id}.money`)
        const status = Math.round(Math.random() * (2 - 1) + 1)
        const amount = Math.round(Math.random() * (10 - 2) + 2)
        const stolen = Math.round(userTwoAmount / amount)

        if (userTwo != interaction.member.user.id) {
            if (status > 1) {
                db.set(`${interaction.member.user.id}.money`, userOneAmount + stolen) // change the total for the person giving
                db.set(`${userTwo}.money`, userTwoAmount - stolen) // give money to new user


                const embed = new MessageEmbed()
                embed.setTitle("Rob")
                embed.setDescription(`you have stole $${stolen} from <@${userTwo}> theyre broke now, hope you're happy`)
                embed.setColor("#ffff00")
                embed.setTimestamp()
                return await interaction.reply({ embeds: [embed] })
            } else {
                const embed = new MessageEmbed()
                embed.setTitle("Rob")
                embed.setDescription(`you failed to steal money from <@${userTwo}>... tsk tsk tsk`)
                embed.setColor("#ffff00")
                embed.setTimestamp()
                return await interaction.reply({ embeds: [embed] })
            }
        } else {
            const embed = new MessageEmbed()
            embed.setTitle("Rob")
            embed.setDescription(`whats ur problem dude, you cant rob urself`)
            embed.setColor("#ffff00")
            embed.setTimestamp()
            return await interaction.reply({ embeds: [embed] })
        }
    }
} //oh lol