let { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, args, usedPrefix, command }) => {

if (args.startsWith('${usedPrefix}' + '${command}')) {
var user = m.sender
         m.reply(`Maaf Kak @${user.split ("@")[0]}, Command *${usedPrefix}${command}* Tidak Ada Di Dalam *${usedPrefix}menu*`)
       }
}

module.exports = handler