const dayjs = require('dayjs');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: {
        name: 'info',
        description: 'info su utenti o sul server'
    },
    async execute(interaction) {
        if(interaction.options.getSubcommand() === 'user') {
            const utente = interaction.options.getUser('user') ? interaction.options.getUser('user') : interaction.user;
            const member = interaction.options.getMember('user') ? interaction.options.getMember('user') : interaction.member;

            const embedUser = new MessageEmbed()
                .setAuthor(`${user.username}#${user.discriminator}`, user.displayAvatarURL({ dynamic: true }))
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .addField('Joined discord:', `${dayjs(user.createdAt).format('DD/MM/YYYY')}`, true)
                .addField('Joined the server:', `${member.joinedAt}`, true)
                .addField('Roles:', `${member.roles.cache.map(gr => `${gr}`).join(', ')}`, true)
                .setFooter('ID' + user.id )
                .setTimestamp();

                await interaction.reply({ embeds: [embedUser] });

        } else if (interaction.options.getSubcommand() === 'server') {
            const guild = interaction.guild;
            const owner = await guild.members.fetch(guild.ownerId);
            const tier = guild.premiumTier === 'NONE' ? '0' : guild.premiumTier.split('_')[1];
            
            const serverEmbed = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({ dynamic: true}))
            .setThumbnail(guild.iconURL({ dynamic: true}))
            .addField('Info', `
                **Owner**: ${owner.user.username}#${owner.user.discriminator}
                **Boost level**: ${guild.premiumSubscriptionCount} (tier: ${tier})
                **creato**: ${dayjs(guild.createdAt).format('DD/MM/YYYY')}
            `, true)
            .addField('stats numeriche' `
            **gente**: ${guild.memberCount}
            **ruoli**: ${guild.roles.cache.size}
            **canali**: ${guild.channels.cache.size}
                - Testo: ${guild.channels.cache.filter(ct => ct.type === 'GUILD_TEXT').size}
                - Voce: ${guild.channels.cache.filter(cv => cv.type === 'GUILD_VOICE').size}
            `, true)
            .setFooter(`id: ${guild.id}`);

            await interaction.reply({ embeds: [serverEmbed]});

        }
    }
}