let axios = require("axios");
let handler = async(m, { conn, text }) => {
  if (!text) return m.reply('_Masukkan Nomor Tujuan!_')
await axios.get(`https://api-anoncybfakeplayer.herokuapp.com/spamcall?nomor=${text}`).then ((res) => {
  let user = m.sender
 // let cal = `@${no.split("@")[0]}`
  conn.reply(m.chat, `_Hey @${user.split("@")[0]}! Pastikan Nomor Yang Kamu Tuju Aktif Dan Bisa Dihubungi!, Karena Nomor Tersebut Akan Menerima Telpon Virtual Dari System Kami !!!_`, m, { contextInfo: { mentionedJid: user } })
    })
}
 
handler.command = /^(call(me)?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null


module.exports = handler

//  MUHAMMAD AFDHAN
