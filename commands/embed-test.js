const { MessageEmbed } = require('discord.js');

module.exports = {
    data: {
        name: 'test',
        description: 'messaggio di test'
    },
    async execute(interaction) {
        const testEmbed = new MessageEmbed()
            .setColor('#121275')
            .setTitle('un messaggio di test')
            .setDescription('messaggio di test ma embed.')
            .setURL('https://fasm.ga/rickroll')
            .setAuthor('xeny')
            .addField('field 1', 'lol' ,true)
            .addField('field 2', 'lol 2', true)
            .addField('field 3', 'lol 3', true)
            .setImage('https://cdn.pixabay.com/photo/2018/11/29/20/47/christmas-background-3846456_960_720.jpg')
            .setFooter('fine di questo embed', 'https://cdn.pixabay.com/photo/2018/11/29/20/47/christmas-background-3846456_960_720.jpg')
            .setTimestamp();
            interaction.reply({ embeds: [testEmbed] });

    }
}