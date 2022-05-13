const { MessageEmbed } = require(`discord.js`)

module.exports = {
    name: "buy",
    description: "buy something",
    options: [
        {
            name: "item",
            description: "what do you want to buy?",
            type: "STRING",
            choices: [
                {
                    name: "Apple $5",
                    value: "apple"
                },
                {
                    name: "Pizza - $10",
                    value: "pizza"
                }
            ],
            required: true
        }
    ],
    async execute(interaction, client, db) {
        let item = interaction.options.getString("item");
        if (item) {
            // const totalAmount = db.get(`${userTwo}.money`)
            db.push(`${interaction.member.user.id}.items`, item)
            const embed = new MessageEmbed()
            embed.setTitle("Buy")
            embed.setDescription(`you bought ${item} \n poggers it works`)
            embed.setColor("#ffff00")
            embed.setTimestamp()
            return await interaction.reply({ embeds: [embed] })
        } else {
            const embed = new MessageEmbed()
            embed.setTitle("Buy")
            embed.setDescription(`bruh L you dont have enough money`)
            embed.setColor("#ffff00")
            embed.setTimestamp()
            return await interaction.reply({ embeds: [embed] })
        }
    }
    // finished
}