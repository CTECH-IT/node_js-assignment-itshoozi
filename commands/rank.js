const { MessageEmbed, MessageAttachment } = require(`discord.js`)
const canvacord = require("canvacord");

module.exports = {
    name: "rank",
    description: "Shows your level",
    async execute(interaction, client, db) {
        let currentXP = db.get(`${interaction.member.user.id}.xp`)
        let xpToLevel = db.get(`${interaction.member.user.id}.xpToLevel`)
        let level = db.get(`${interaction.member.user.id}.level`)
        let user = await interaction.user.fetch()
        if (level == undefined) {
             currentXP = 0
             xpToLevel = 100
             level = 1
        }

        const card = new canvacord.Rank()
        .setAvatar(interaction.user.displayAvatarURL({format: "png"}))
        .setCurrentXP(currentXP) // replace with your xp
        .setRequiredXP(xpToLevel) // replace with your required xp
        .setStatus("online") // replace with your status
        .setProgressBar("#FFFFFF", "COLOR")
        .setRank(0, "#", false)
        .setLevel(level, "LEVEL")
        // we will use this later .setBackground("IMAGE", user.bannerURL({format: "png"}))
        .setUsername(interaction.user.username)
        .setDiscriminator(interaction.user.discriminator);

        let image = await card.build();
        await interaction.reply({files:[new MessageAttachment(image, "rank.png")]})
    }
}