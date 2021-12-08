const { MessageEmbed, User } = require('discord.js');
module.exports = {
    data: {
        name: 'test',
        description: 'messaggio di test'
    },
    async execute(interaction) {

            const hammer = interaction.options.getMember('hammer-to');
            const mod = interaction.member;

            if (mod === hammer) return await interaction.reply({ content: 'non ti puoi bannare', ephemeral: true});

            if (!hammer.bannable) {
                return await interaction.reply({ content: 'non puoi bannare il vuoto', ephemeral: true})
            };
            if (mod.roles.highest.position <= hammer.roles.highest.position) {
                return await interaction.reply({ content: 'non puoi bannare un ruolo più alto', ephemeral: true})
            };
            
            await hammer.ban();

            const banEmbed = new MessageEmbed()
            .setTitle('Ban di:' + member.user.username)
            .setImage('https://cdn02.plentymarkets.com/1ukve4rrx6jg/item/images/5104/full/Hammer-ohne-Text.jpg')
            .addField('moderatore:', `${mod.user.username}`)
            .addField('tizio bannato:', `${hammer.user.username}#${hammer.user.discriminator}`)
            .setTimestamp()
            .setFooter('VIETATO FARE I MONA.');

            await interaction.reply({ embeds: [banEmbed] });


    }
};