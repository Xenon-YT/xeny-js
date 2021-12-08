require('dotenv').config();
const config = require('./config.json');
const time = require('util').promisify(setTimeout);
const handler = require('fs')
const { Client, Collection, Intents } = require('discord.js');
const { truncate } = require('fs/promises');

const discord = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES ]});
discord.commands = new Collection();
const comandi = handler.readdirSync('./commands').filter(js => js.endsWith('.js'))

for(const js of comandi) {
    const commands = require(`./commands/${js}`);
    discord.commands.set(commands.data, commands);
}

discord.once('ready', () => {
    console.log('online')
});

discord.on('interactionCreate', async (interaction) => {
    console.log(interaction);
    if(!interaction.isCommand()) return;
    
    const nameCommand = interaction.commandName;

    if (!discord.commands.has(nameCommand)) return;

    try {
        await discord.commands.get(nameCommand).execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply('**ERRORE INTERNO**, il proprietario sta risolvendo...')
    }
});

discord.on('messageCreate', async (message) => {
    if(!discord.application?.owner) {
        await discord.application.fetch();
    }
    if(message.content.toLowerCase() === 'xy!rec' && message.author.id === discord.application?.owner.id) {
        const arrayComandi = [
            {
                name: 'test',
                description: 'test message'
            },
            {
                name: 'testwithembed',
                description: 'test message with embed',
            },
            {
                name: 'info',
                description: 'info su utenti o sul server.',
                options: [
                    {
                        name: 'user',
                        description: 'info su un utente',
                        type: 'SUB_COMMAND',
                        options: [
                            {
                                name: 'persona',
                                description: 'il tizio',
                                type: 'USER'
                            }
                        ]
                    },
                    {
                        name: 'server',
                        description: 'info sul server',
                        type: 'SUB_COMMAND'
                    }
                ]
            },
            {
                name: 'buttontest',
                description: 'messaggio di test con i bottoni'
            },
            // {
            //     name: 'ban',
            //     description: 'banhammer',
            //     options: [
            //         {
            //             name: 'hammer-to',
            //             description: 'hammer to a guild user',
            //             type: 'USER',
            //             required: true
            //         }
            //     ]
            // },
            // {
            //     name: 'kick',
            //     description: 'kickhammer',
            //     options: [
            //         {
            //             name: 'hammer-to',
            //             description: 'hammer to a guild user',
            //             type: 'USER',
            //             required: true
            //         }
            //     ]
            // },
            // {
            //     name: 'unban',
            //     description: 'unban pass',
            //     options: [
            //         {
            //             name: 'pass-to',
            //             description: 'unban pass',
            //             type: 'USER',
            //             required: true
            //         }
            //     ]
            // }
        ];

        // comandi a livello di discord. (per più server, quindi con primebots)
        //const slash = await discord.application?.commands.set(arrayComandi);
        //console.log(slash);

        // comandi a livello di un solo server.
        const slash = await discord.guilds.cache.get(config.guild)?.commands.set(arrayComandi);
        console.log(slash);

        // ruoli riservati alla moderazione
            // const comando = await discord.guilds.cache.get(config.guild)?.commands.fetch(config.moderation)

            // const permissions = [
            //     {
            //         // owner
            //         id: '885147278686429234',
            //         type: 'USER',
            //         permission: true
            //     },
            //     {
            //         // admin role
            //         id: '901538401642250273',
            //         type: 'ROLE',
            //         permission: true
            //     },
            //     {
            //         // bot role
            //         id: '901538324865503264',
            //         type: 'ROLE',
            //         permission: true
            //     },
            //     {
            //         // mod role
            //         id: '917473112180818000',
            //         type: 'ROLE',
            //         permission: true
            //     },
            //     {
            //         // everyone role
            //         id: '901538255600746576',
            //         type: 'ROLE',
            //         permission: false
            //     }
            // ]
            // await comando.permissions.set({ permissions })
    }
})

discord.login(process.env.token)