let handler = async(m, { conn, text }) => {
  let user = global.DATABASE.data.users[m.sender]
  user.afk = + new Date
  user.afkReason = text
  let user = m.sender
  let aef = `
_@${user.split("@")[0]} Sekarang AFK!_\nKarena${text ? ': ' + text : ''}
`.trim()
conn.reply(m.chat, aef, m, {
           contextInfo: { 
                 mentionedJid: [user] 
          } 
     })
}

handler.command = /^afk$/i

module.exports = handler
