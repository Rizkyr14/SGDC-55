let handler = async (m, { conn, usedPrefix }) => {
    //let name = m.fromMe ? conn.user : conn.contacts[m.sender]
    let nama = conn.getName(m.sender)
    let own = '6283159600193@s.whatsapp.net'
  conn.reply(m.chat, `_Hai Kak ${nama}, Ketik *${usedPrefix}menu* Untuk Memulai @${own.split("@")[0]}_`, m, { 
      contextInfo: { 
          mentionedJid: [own] 
      } 
  })
    //let mentionedJid = [m.sender]
}
handler.customPrefix = /^(bot|sgdc-bot|bott)$/i
handler.command = new RegExp

module.exports = handler


//module.exports = handler
