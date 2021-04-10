let { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, args, usedPrefix, command }) => {
         let body = m.message.conversation.startsWith(usedPrefix)) //.imageMessage.cap m.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			
if (body.startsWith('${usedPrefix}' + '${command}')) {
var user = m.sender
         conn.reply(m.chat, `Maaf Kak @${user.split ("@")[0]}, Command *${usedPrefix}${command}* Tidak Ada Di Dalam *${usedPrefix}menu*`, m, { 
                  contextInfo: { 
                           mentionedJid: [user] 
                  }
            })
       }
}

handler.command = new RegExp
handler.customPrefix = /kntl/
module.exports = handler
