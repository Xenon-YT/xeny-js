const time = require('util').promisify(setTimeout);
const { MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
    data: {
        name: 'test',
        description: 'messaggio di test'
    },
    async execute(interaction) {
        await interaction.reply({ content: 'test', ephemeral: true});
        await time(1000);
        await interaction.editReply('pong');
        await interaction.deleteReply();

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