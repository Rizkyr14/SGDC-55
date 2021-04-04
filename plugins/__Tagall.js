let { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text }) => {
  let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
  let mem = `*「  TAG ALL MEMBER  」*\n\n`
  for (let i = 0; i < users.length; i++) {
      mem += ` *➸* @${users[i].split("@")[0]}\n`
     }
      mem += '\n\n*「 • 」  SGDC-BOT  「 • 」*'

  conn.reply(m.chat, mem, m, {
    contextInfo: {
      mentionedJid: users 
    } 
  })
}

handler.command = /^(tagall)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = true
handler.botAdmin = true

handler.fail = null

module.exports = handler


