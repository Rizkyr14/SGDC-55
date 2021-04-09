const { MessageType } = require('@adiwajshing/baileys')
let handler = async function(m, { conn , args, text, isAdmin, isBotAdmin, groupMetadata }) {

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let usname = conn.getName(who)
  let users = m.sender
  let vir = users.split("@s.whatsapp.net")[0]
  if (!m.isGroup) { 
    m.reply('_BAPAK LO JAGOAN MANA ANJING !?!?_')
  } else {
  	if (isAdmin) return m.reply('*ADMIN KONTOL*')
    await conn.reply(m.chat, `
*[ CHAT ANTI VIRTEX ]*

_Terdeteksi *${usname}* telah mengirim virtex!_

Maaf Kamu akan dikick oleh *SGDC-BOT*
`.trim(), m)
 if (isBotAdmin) {
   conn.groupRemove(m.chat, [users])
     } else { 
     	m.reply('```JADIKAN BOT SEBAGAI ADMIN !!!```')
    }
  } conn.sendMessage(vir + '@s.whatsapp.net', `${m.text}`, MessageType.text)
}
handler.customPrefix = /๒๒๒๒๒๒/i
handler.command = new RegExp

handler.fail = null

module.exports = handler
// by Muhammad Afdhan
// INI WM KU
