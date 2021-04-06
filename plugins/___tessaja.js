const { MessageType } = require('@adiwajshing/baileys')
const fs = require('fs')
let handler = async(m, { conn, text, participants, isPrems }) => {
let who
  if (m.isGroup) who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  else who = m.chat
  if (!who) throw '_Tag orang yang akan dijadikan user premium!_'
  let user = `${who.split("@s.whatsapp.net")[0]}`
  let fuck = global.prems.indexOf(user)
  let up = global.prems.splice(fuck, 1)
  fs.writeFileSync('./config.js',JSON.stringify(up))
  let prem = `
*╭═══[ • SGDC-BOT • ]═══╮*

_Berhasil Delete User Premium_
_User @${who.split("@")[0]_
`.trim()
  conn.reply(m.chat, prem, m, { contextInfo { mentiondeJid: [who]}})
}
handler.command = /^(delprem)$/i
handler.rowner = true

module.exports = handler


