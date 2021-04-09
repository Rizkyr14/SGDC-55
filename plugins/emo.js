const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text }) => {
 await m.reply('*[ WAIT ]* _Sedang Diproses..._')
let [ayam, geprek] = text.split `|`
 try {
  if (!ayam) throw '_Masukkan Tipe!_'
  if (!geprek) throw '_Emojinya mana?_'
  let stic = await sticker(null, global.API('xteam', '/sticker/emojitopng' + ayam, { emo: geprek }, 'APIKEY'), global.packname, global.author)
  conn.sendMessage(m.chat, stic, MessageType.sticker, {
    quoted: m
  })
 } catch (e) {
   m.reply('```Error!```')
  }
}

handler.command = /^(emo)$/i
handler.owner = false
handler.mods = false
handler.premium = true
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

//  MUHAMMAD AFDHAN

module.exports = handler
