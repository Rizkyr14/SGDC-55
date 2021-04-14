const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
let handler  = async (m, { conn, args, text }) => {
  let [kontol, memek] = text.split `|`
  let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image|video/.test(mime)) {
      let img = await q.download()
      if (!img) throw 'Foto/Video tidak ditemukan'
      stiker = await sticker(img, false, kontol, memek)
    } else if (args[0]) stiker = await sticker(false, args[0], kontol, memek)
  } finally {
    if (stiker) conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
    else throw 'Conversion failed'
  }
}

handler.command = /^wm$/i

module.exports = handler
