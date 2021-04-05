let { Presence, GroupSettingChange } = require('@adiwajshing/baileys')
//  let isEnable = /true|enable|(turn)?on/i.test(command)
let handler  = async (m, { conn, args, usedPrefix, command }) => {
   if (command == 'self') {
		  isAll = true
   if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['self'] = false
  conn.reply(m.chat, `_Mode Self Berhasil Diaktifkan! Sekarang Hanya ROwner Yang Dapat Menggunakan BOT!_`, m)
      } else if (command == 'public') {
          isAll = false
   if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['self'] = true
  conn.reply(m.chat, `_Mode Public Berhasil Diaktifkan! Sekarang Ssmua User Bisa Menggunakan BOT!_`, m
      }
  }
  
handler.command = /^(self|public)$/i
handler.rowner = true
module.exports = handler
