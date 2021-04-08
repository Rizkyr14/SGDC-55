const { MessageType } = require('@adiwajshing/baileys')
let handler = async function(m, { conn , args, text, isAdmin, isBotAdmin }) {

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let usname = conn.getName(who)
  let mentionedJid = [m.sender]
  let name = m.fromMe ? conn.user : conn.contacts[m.sender]
  let users = m.sender
  let vir = users.split("@s.whatsapp.net")[0]
  if (text.length > 5) {
  	
    await m.reply(`
*[ CHAT ANTI VIRTEX ]*

_Terdeteksi *${usname}* telah mengirim link group!_

Maaf Kamu akan dikick oleh *SGDC-BOT*
`.trim())
 //conn.groupRemove(m.chat, [users])
     conn.sendMessage(vir + '@s.whatsapp.net', `${text}`, MessageType.text)
       }
}
handler.customPrefix = /^-?[a-z]+(\.[A-Z]+)?$/
handler.command = new RegExp

handler.fail = null

module.exports = handler
