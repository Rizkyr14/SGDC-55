let handler = (m, { conn, usedPrefix, command }) => {
let name = conn.getName(m.sender)
let peler = m.sender
 conn.reply(m.chat, `_Maaf Kak @${peler.split("@")[0]}! Command *${m.text}* Tidak Terdaftar Di *${usedPrefix}menu*_`, m, { 
  contextInfo: { 
   mentionedJid: [peler]
  }
 })
}/*
handler.command = new RegExp

module.exports = handler
*/
