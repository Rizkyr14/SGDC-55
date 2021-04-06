const { MessageType } = require('@adiwajshing/baileys')
const fs = require('fs')
let handler = async(m, { conn, text, participants, isPrems }) => {

fs.readFileSync('./config.js',JSON.stringify(global.prems))
     let kntl = global.prems
     let user = `Total User Premium: ${kntl.length}\n`
     for (let kon of kntl) {
         user += `➸ @${kon.split("@")[0]}\n`
        }
        user += '\n*[ • SGDC-BOT • ]*'

  conn.reply(m.chat, user, m, {
           contextInfo: { 
                 mentionedJid: [kon]
          } 
     })
  }
  
handler.command = /^(listprem)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

//  MUHAMMAD AFDHAN

module.exports = handler
