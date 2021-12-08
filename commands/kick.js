const { MessageEmbed, User } = require('discord.js');
module.exports = {
    data: {
        name: 'kick',
        description: 'kickhammer'
    },
    async execute(interaction) {

            const hammer = interaction.options.getMember('hammer-to');
            const mod = interaction.member;

            if (mod === hammer) return await interaction.reply({ content: 'non ti puoi kickare', ephemeral: true});

            if (!hammer.kickable) {
                return await interaction.reply({ content: 'non puoi kickare il vuoto', ephemeral: true})
            };
            if (mod.roles.highest.position <= hammer.roles.highest.position) {
                return await interaction.reply({ content: 'non puoi kickare un ruolo più alto', ephemeral: true})
            };
            
            await hammer.kick();

            const kickEmbed = new MessageEmbed()
            .setTitle('Kick di:' + member.user.username)
            .setImage('https://cdn02.plentymarkets.com/1ukve4rrx6jg/item/images/5104/full/Hammer-ohne-Text.jpg')
            .addField('moderatore:', `${mod.user.username}`)
            .addField('tizio kickato:', `${hammer.user.username}#${hammer.user.discriminator}`)
            .setTimestamp()
            .setFooter('VIETATO FARE I MONA.');

            await interaction.reply({ embeds: [kickEmbed] });


    }
};