let axios = require("axios");
const { MessageType } = require('@adiwajshing/baileys')
const fs = require('fs')
let handler = async(m, { conn, text, participants, isPrems }) => {
let who
  if (m.isGroup) who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  else who = m.chat
  if (!who) throw '_Tag orang yang akan dijadikan user premium!_'
  let user = `${who.split("@s.whatsapp.net")[0]}`
  let up = global.prems.push(user)
  fs.writeFileSync('./config.js',JSON.stringify(up))
  let prem = `
*╭═══[ • SGDC-BOT • ]═══╮*
_Berhasil Add User Premium_
_~> Nomor: wa.me/${who.split("@s.whatsapp.net")[0]}_
`.trim()
  conn.reply(m.chat, prem, m)
}
handler.command = /^(addprem|prem|addprems)$/i

handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

//  MUHAMMAD AFDHAN
