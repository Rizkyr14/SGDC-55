let handler = async (m, { conn, args }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.quoted
  let usname = conn.getName(who)
  let mentionedJid = [m.quoted]
  let name = m.fromMe ? conn.user : conn.contacts[m.sender]
  let users = m.quoted
   conn.groupRemove(m.chat, [users])
}
handler.customPrefix = /^kill $/i
handler.command = new RegExp
handler.owner = true


module.exports = handler

