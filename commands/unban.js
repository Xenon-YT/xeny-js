const { MessageEmbed, User } = require('discord.js');
module.exports = {
    data: {
        name: 'test',
        description: 'messaggio di test'
    },
    async execute(interaction) {

            const pass = interaction.options.get('pass-to').value;
            const mod = interaction.member;

try {
    await interaction.guild.members.unban(pass)
} catch {
    interaction.reply({ content: `Non sono riuscito a sbannare ${pass}`, ephemeral: true })
}

            const sbanEmbed = new MessageEmbed()
            .setTitle('Unban di:' + member.user.username)
            .setImage('https://cdn02.plentymarkets.com/1ukve4rrx6jg/item/images/5104/full/Hammer-ohne-Text.jpg')
            .addField('moderatore:', `${mod.user.username}`)
            .addField('tizio sbannato:', `${pass.user.username}#${pass.user.discriminator}`)
            .setTimestamp()
            .setFooter('bentornato!');

            await interaction.reply({ embeds: [sbanEmbed] });


    }
};