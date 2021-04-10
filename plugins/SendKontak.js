let { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, args, usedPrefix, command }) => {

if (args.startsWith(global.prefix)) {
var user = m.sender
         conn.reply(m..chat, `Maaf Kak @${user.split ("@")[0]}, Command *${usedPrefix}${command}* Tidak Ada Di Dalam *${usedPrefix}menu*`, m, { 
                  contextInfo: { 
                           mentionedJid: [user] 
                  }
            })
       }
}

module.exports = handler
