const { MessageType } = require('@adiwajshing/baileys')
let util = require('util')
let path = require('path')
let { spawn } = require('child_process')
const fs = require('fs')

let handler = async(m, { conn, text, participants, isPrems }) => {

let kntl = fs.readFileSync('./config.js',JSON.stringify(global.prems))
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
