const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: {
        name: 'buttontest',
        description: 'messaggio di test con i bottoni'
    },
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('test')
                    .setLabel('testù')
                    .setStyle('PRIMARY'),
            )
            await interaction.reply({ content: 'messaggio con i bottoni', components: [row] });
    }
};