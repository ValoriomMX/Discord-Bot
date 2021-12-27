const Discord = require('discord.js')
const config = require('./config.json')
const client = new Discord.Client({ ws: { intents: Discord.Intents.NON_PRIVILEGED } })
const axios = require('axios')
const db = require('megadb')


const whitelist_db = new db.crearDB('whitelist', 'server')
const token = config.token
const staffs = config.staffs


client.on('ready', () => {
    console.log('Bot encendido')
    setInterval(function() {
        let statuses = [`Server Network`, `www.minemen.club`, `store.minemen.club`, `Prefix: !`];
        let status = Math.floor(Math.random() * statuses.length);
        let dstatus = statuses[status];
        client.user.setPresence({
            activity: {
                name: `${dstatus}`,
                type: "WATCHING"
            },
            status: "online"
        });
    }, 8000);
})

client.on('message', async message => {
    if (message.author.bot) return
    if (message.content.toLowerCase().startsWith('!ip') || message.content.toLowerCase().startsWith('!server')) {
        const api = await axios.get('https://api.mcsrvstat.us/2/minemen.club')
        if (api.data.online == true) {
            if (whitelist_db.tiene(`WHITELIST`)) {
                banner = 'http://status.mclive.eu/Bot/minemen.club/banner.png'
                const embed = new Discord.MessageEmbed().setColor('RANDOM').setImage(banner).setThumbnail('https://api.mcsrvstat.us/icon/minemen.club').setAuthor('Server Network | Server IP', 'https://api.mcsrvstat.us/icon/minemen.club').setTimestamp().setFooter('Server Network', 'https://media.discordapp.net/attachments/924849603466121216/925134110148681789/Bot-1.png?width=468&height=468').setDescription('**`📋` IP:** minemen.club\n\n **`☄️` Estado:** Online\n\n **`📄` Whitelist:**  Activada\n\n **Jugadores:** ' + api.data.players.online + '/' + api.data.players.max + '\n\n**`🖨️` MOTD:** ' + api.data.motd.clean + '\n\n**`📚` Version:** ' + api.data.version + '\n\n**`🖼️` Banner:**');
                const embed2 = new Discord.MessageEmbed().setColor('RANDOM').setImage(banner).setThumbnail('https://api.mcsrvstat.us/icon/minemen.club').setAuthor('Server Network | Server IP', 'https://api.mcsrvstat.us/icon/minemen.club').setTimestamp().setFooter('Server Network', 'https://media.discordapp.net/attachments/924849603466121216/925134110148681789/Bot-1.png?width=468&height=468').setDescription('**`📋` IP:** minemen.club\n\n **`☄️` Status:** Online\n\n **`📄` Whitelist:**  Activated\n\n **Players:** ' + api.data.players.online + '/' + api.data.players.max + '\n\n**`🖨️` MOTD:** ' + api.data.motd.clean + '\n\n**`📚` Version:** ' + api.data.version + '\n\n**`🖼️` Banner:**');
                message.channel.send(embed).then(msg => {
                    msg.react('🇺🇸')
                    msg.react('🇪🇸')
                    msg.awaitReactions((reaction, user) => {
                        if (message.author.id !== user.id) return;
                        if (reaction.emoji.name === '🇺🇸') {
                            msg.edit(embed2)
                            msg.reactions.removeAll()
                            msg.react('🇺🇸')
                            msg.react('🇪🇸')
                        }
                        if (reaction.emoji.name === '🇪🇸') {
                            msg.edit(embed)
                            msg.reactions.removeAll()
                            msg.react('🇺🇸')
                            msg.react('🇪🇸')
                        }
                    })

                })
            }

            if (!whitelist_db.tiene(`WHITELIST`)) {
                banner = 'http://status.mclive.eu/Bot/minemen.club/banner.png'
                const embed = new Discord.MessageEmbed().setColor('RANDOM').setImage(banner).setThumbnail('https://api.mcsrvstat.us/icon/minemen.club').setAuthor('Server Network | Status Server', 'https://api.mcsrvstat.us/icon/minemen.club').setDescription('**`📋` IP:** minemen.club\n\n **`☄️` Estado:** Online\n\n **`📄` Whitelist:**  Desactivada\n\n **Jugadores:** ' + api.data.players.online + '/' + api.data.players.max + '\n\n**`🖨️` MOTD:** ' + api.data.motd.clean + '\n\n**`📚` Version:** ' + api.data.version + '\n\n**`🖼️` Banner:**').setTimestamp().setFooter('Server Network', 'https://media.discordapp.net/attachments/924849603466121216/925134110148681789/Bot-1.png?width=468&height=468')
                const embed2 = new Discord.MessageEmbed().setColor('RANDOM').setImage(banner).setThumbnail('https://api.mcsrvstat.us/icon/minemen.club').setAuthor('Server Network | Status Server', 'https://api.mcsrvstat.us/icon/minemen.club').setDescription('**`📋` IP:** minemen.club\n\n **`☄️` Status:** Online\n\n **`📄` Whitelist:**  Deactivated\n\n **Players:** ' + api.data.players.online + '/' + api.data.players.max + '\n\n**`🖨️` MOTD:** ' + api.data.motd.clean + '\n\n**`📚` Version:** ' + api.data.version + '\n\n**`🖼️` Banner:**').setTimestamp().setFooter('Server Network', 'https://media.discordapp.net/attachments/924849603466121216/925134110148681789/Bot-1.png?width=468&height=468')
                message.channel.send(embed).then(msg => {
                    msg.react('🇺🇸')
                    msg.react('🇪🇸')
                    msg.awaitReactions((reaction, user) => {
                        if (message.author.id !== user.id) return;
                        if (reaction.emoji.name === '🇺🇸') {
                            msg.edit(embed2)
                            msg.reactions.removeAll()
                            msg.react('🇺🇸')
                            msg.react('🇪🇸')
                        }
                        if (reaction.emoji.name === '🇪🇸') {
                            msg.edit(embed)
                            msg.reactions.removeAll()
                            msg.react('🇺🇸')
                            msg.react('🇪🇸')
                        }
                    })

                })
            }
        }
        if (api.data.online === false) {
            const embed = new Discord.MessageEmbed().setColor('RED').setAuthor('Server Network | Server Status', message.author.displayAvatarURL({ dynamic: true })).setDescription('**`📋` IP:** minemen.club\n\n **`☄️` Estado:** Offline').setTimestamp().setFooter('Server Network', 'https://media.discordapp.net/attachments/924849603466121216/925134110148681789/Bot-1.png?width=468&height=468')
            const embed2 = new Discord.MessageEmbed().setColor('RED').setAuthor('Server Network | Server Status', message.author.displayAvatarURL({ dynamic: true })).setDescription('**`📋` IP:** minemen.club\n\n **`☄️` Status:** Offline').setTimestamp().setFooter('Server Network', 'https://media.discordapp.net/attachments/924849603466121216/925134110148681789/Bot-1.png?width=468&height=468')
            message.channel.send(embed).then(msg => {
                msg.react('🇺🇸')
                msg.react('🇪🇸')
                msg.awaitReactions((reaction, user) => {
                    if (message.author.id !== user.id) return;
                    if (reaction.emoji.name === '🇺🇸') {
                        msg.edit(embed2)
                        msg.reactions.removeAll()
                        msg.react('🇺🇸')
                        msg.react('🇪🇸')
                    }
                    if (reaction.emoji.name === '🇪🇸') {
                        msg.edit(embed)
                        msg.reactions.removeAll()
                        msg.react('🇺🇸')
                        msg.react('🇪🇸')
                    }
                })

            })
        }
    }
})

client.on('message', async message => {
    if (message.author.bot) return
    if (message.content.toLowerCase().startsWith('!whitelist')) {
        if (!staffs.includes(message.author.id)) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setThumbnail('https://media.giphy.com/media/3ov9jNziFTMfzSumAw/giphy.gif').setAuthor('Server Network - Whitelist', message.author.displayAvatarURL({ dynamic: true })).setDescription(`\`👨‍💻\` Hey ${message.author.toString()} you dont have Permissions to execute this command\n\n If this is a error Contact the Bot Developer; [**Valoriom#5820**](https://github.com/ValoriomMX)`).setTimestamp().setFooter('Server Network', 'https://media.discordapp.net/attachments/924849603466121216/925134110148681789/Bot-1.png?width=468&height=468'))
        if (!whitelist_db.tiene(`WHITELIST`)) {
            whitelist_db.establecer(`WHITELIST`, 'SI')
            return message.channel.send('The withelist mode of the server has been activated.')
        }
        if (whitelist_db.tiene(`WHITELIST`)) {
            whitelist_db.eliminar(`WHITELIST`, 'SI')
            return message.channel.send('Server whitelist mode has been disabled.')
        }
    }
})


client.on('message', async message => {
    if (message.author.bot) return
    if (message.content.toLowerCase().startsWith('!ts')) {
        const embed2 = new Discord.MessageEmbed().setColor('RANDOM').setAuthor('Server Network | TeamSpeak', message.author.displayAvatarURL({ dynamic: true })).setTimestamp().setFooter('Server Network', 'https://media.discordapp.net/attachments/924849603466121216/925134110148681789/Bot-1.png?width=468&height=468').setDescription('TeamSpeak: **ts.minemen.club**');
        const embed = new Discord.MessageEmbed().setColor('RANDOM').setAuthor('Server Network | TeamSpeak', message.author.displayAvatarURL({ dynamic: true })).setTimestamp().setFooter('Server Network', 'https://media.discordapp.net/attachments/924849603466121216/925134110148681789/Bot-1.png?width=468&height=468').setDescription('TeamSpeak: **ts.minemen.club**');
        message.channel.send(embed).then(msg => {
            msg.react('🇺🇸')
            msg.react('🇪🇸')
            msg.awaitReactions((reaction, user) => {
                if (message.author.id !== user.id) return;
                if (reaction.emoji.name === '🇺🇸') {
                    msg.edit(embed2)
                    msg.reactions.removeAll()
                    msg.react('🇺🇸')
                    msg.react('🇪🇸')
                }
                if (reaction.emoji.name === '🇪🇸') {
                    msg.edit(embed)
                    msg.reactions.removeAll()
                    msg.react('🇺🇸')
                    msg.react('🇪🇸')
                }
            })

        })

    }
})

client.on('message', async message => {
    if (message.author.bot) return
    if (message.content.toLowerCase().startsWith('!botinfo')) {
        const embed2 = new Discord.MessageEmbed().setColor('RANDOM').setAuthor('Bot-Info | Credits', message.author.displayAvatarURL({ dynamic: true })).setTimestamp().setFooter('Bot-Info | Credits', 'https://media.discordapp.net/attachments/852764662227402752/924771706164346910/IMG_4005.jpg?width=612&height=468').setDescription('This Bot is maded by ValoriomMX on GitHub.\n\n- **GitHub**: [Click Here](https://github.com/ValoriomMX)\n- **Twitter**: [Click Here](https://twitter.com/Valoriom04)\n- **Discord**: [Click Here](https://discord.gg/n6B3nrWzdt)');
        const embed = new Discord.MessageEmbed().setColor('RANDOM').setAuthor('Bot-Info | Credits', message.author.displayAvatarURL({ dynamic: true })).setTimestamp().setFooter('Bot-Info | Credits', 'https://media.discordapp.net/attachments/852764662227402752/924771706164346910/IMG_4005.jpg?width=612&height=468').setDescription('This Bot is maded by ValoriomMX on GitHub.\n\n- **GitHub**: [Click Here](https://github.com/ValoriomMX)\n- **Twitter**: [Click Here](https://twitter.com/Valoriom04)\n- **Discord**: [Click Here](https://discord.gg/n6B3nrWzdt)');
        message.channel.send(embed).then(msg => {
            msg.react('🇺🇸')
            msg.react('🇪🇸')
            msg.awaitReactions((reaction, user) => {
                if (message.author.id !== user.id) return;
                if (reaction.emoji.name === '🇺🇸') {
                    msg.edit(embed2)
                    msg.reactions.removeAll()
                    msg.react('🇺🇸')
                    msg.react('🇪🇸')
                }
                if (reaction.emoji.name === '🇪🇸') {
                    msg.edit(embed)
                    msg.reactions.removeAll()
                    msg.react('🇺🇸')
                    msg.react('🇪🇸')
                }
            })

        })

    }
})

client.on('message', async message => {
    if (message.author.bot) return
    if (message.content.toLowerCase().startsWith('!store') || message.content.toLowerCase().startsWith('!store')) {
        const embed = new Discord.MessageEmbed().setAuthor('Server Network - Store', message.author.displayAvatarURL({ dynamic: true })).setDescription('Buscas nuestra Tienda? **[Click Here](http://store.minemen.club)**').setColor('RANDOM').setTimestamp().setFooter('Server Network', 'https://media.discordapp.net/attachments/924849603466121216/925134110148681789/Bot-1.png?width=468&height=468')
        const embed2 = new Discord.MessageEmbed().setAuthor('Server Network - Store', message.author.displayAvatarURL({ dynamic: true })).setDescription('Looking for our Store? **[Click Here](http://store.minemen.club)**').setColor('RANDOM').setTimestamp().setFooter('Server Network', 'https://media.discordapp.net/attachments/924849603466121216/925134110148681789/Bot-1.png?width=468&height=468')
        message.channel.send(embed).then(msg => {
            msg.react('🇺🇸')
            msg.react('🇪🇸')
            msg.awaitReactions((reaction, user) => {
                if (message.author.id !== user.id) return;
                if (reaction.emoji.name === '🇺🇸') {
                    msg.edit(embed2)
                    msg.reactions.removeAll()
                    msg.react('🇺🇸')
                    msg.react('🇪🇸')
                }
                if (reaction.emoji.name === '🇪🇸') {
                    msg.edit(embed)
                    msg.reactions.removeAll()
                    msg.react('🇺🇸')
                    msg.react('🇪🇸')
                }
            })

        })
    }
})

client.on('message', async message => {
    if (message.author.bot) return
    if (message.content.toLowerCase().startsWith('!say')) {
        if (!staffs.includes(message.author.id)) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setThumbnail('https://media.giphy.com/media/3ov9jNziFTMfzSumAw/giphy.gif').setAuthor('Server Network | Announces', message.author.displayAvatarURL({ dynamic: true })).setDescription(`\`👨‍💻\` Hey ${message.author.toString()} you dont have Permissions to execute this command\n\n If this is a error Contact the Bot Developer; [**Valoriom#5820**](https://github.com/ValoriomMX)`).setTimestamp().setFooter('Server Network', 'https://media.discordapp.net/attachments/924849603466121216/925134110148681789/Bot-1.png?width=468&height=468'))
        const args = message.content.split('!say')[1]
        if (args.length === 0) return message.channel.send('You must write an Announcement!')

        message.channel.send('Perfect, Tell me the title/type of ad (You have 10 seconds)')
        const collector = message.channel.createMessageCollector(
            m => m.author.id === message.author.id && m.channel.id === message.channel.id, { time: 100000 }
        );

        let titulo
        let arg
        collector.on('collect', collected => {
            arg = collected.content
            collector.stop()
        })
        collector.on('end', collected => {
            if (collected.size !== 0) {
                titulo = arg
            }
            if (collected.size === 0) {
                titulo = '**NEW ANNOUNCEMENT**'
            }
            const collector2 = message.channel.createMessageCollector(
                m => m.author.id === message.author.id && m.channel.id === message.channel.id, { time: 10000 }
            );

            message.channel.send('Now mention the channel to which the message is going to be sent.')
            let arg2
            let pene
            collector2.on('collect', collected2 => {
                pene = collected2.content.replace('<#', '')
                arg2 = pene.replace('>', '')
                collector2.stop()
            })
            collector2.on('end', collected2 => {

                if (collected2.size !== 0) {
                    if (isNaN(arg2)) return message.channel.send(new Discord.MessageEmbed().setTitle(titulo).setDescription(args).setColor('RANDOM').setTimestamp().setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true })))
                    const canal = message.guild.channels.cache.find(c => c.id === arg2)
                    canal.send(new Discord.MessageEmbed().setTitle(titulo).setDescription(args).setColor('RANDOM').setTimestamp().setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true })))
                }
                if (collected2.size === 0) {
                    message.channel.send(new Discord.MessageEmbed().setTitle(titulo).setDescription(args).setColor('RANDOM').setTimestamp().setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true })))
                }

            })

        })
    }
})

client.on('message', async message => {
    if (message.author.bot) return
    if (message.content.toLowerCase().startsWith('!help')) {
        if (!staffs.includes(message.author.id)) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setThumbnail('https://media.giphy.com/media/3ov9jNziFTMfzSumAw/giphy.gif').setAuthor('Server Network - Whitelist', message.author.displayAvatarURL({ dynamic: true })).setDescription(`Only the staff added to the bot can execute these commands and you are not in them ${message.author.toString()}.`).setFooter('Server Network', 'https://media.discordapp.net/attachments/924849603466121216/925134110148681789/Bot-1.png?width=468&height=468'))
        message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setAuthor('Server Network | Staff Help', message.author.displayAvatarURL({ dynamic: true })).setDescription('\n[+] Staff Commands:\n**!whitelist** (Enable or Disable Whitelist to Inform Users)\n**!say** (Announce Something With The Bot)').setTimestamp().setFooter('Server Network', 'https://media.discordapp.net/attachments/924849603466121216/925134110148681789/Bot-1.png?width=468&height=468'))
    }
})

client.login(token)