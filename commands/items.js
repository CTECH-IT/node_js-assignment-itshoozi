const { MessageEmbed } = require(`discord.js`)

module.exports = {
    name: "items",
    description: "get a list of all the items you own",
    async execute(interaction, client, db) {
        const items = db.get(`${interaction.member.user.id}.items`)

        const count = {};

        items.forEach(element => {
            if (element == "apple") {
                count.apple = (count.apple || 0) + 1;
            } else if (element == "pizza") {
                count.pizza = (count.pizza || 0) + 1;
            }
        });

        const embed = new MessageEmbed()
        embed.setTitle("Items")
        embed.setDescription(`Apples: **${count.apple}** \n Pizza: **${count.pizza}**`)
        embed.setColor("#ffff00")
        embed.setTimestamp()
        return await interaction.reply({ embeds: [embed] })
    }
    // finished
}