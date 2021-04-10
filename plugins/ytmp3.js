let imageToBase64 = require('image-to-base64');
let axios = require("axios");
let handler = async(m, { conn, text }) => {
 if (!text) return conn.reply(m.chat, '_Masukkan Judul Video_', m)
  await m.reply('*[ WAIT ]* _Sedang Diproses.._')
  try{
   let api = 'apivinz'
    axios.get(`https://api.zeks.xyz/api/ytmp3?url=${text}&apikey=${api}`)
    .then((res) => {
      imageToBase64(res.data.result.thumbnail)
        .then(
          (ress) => {
            let buf = Buffer.from(ress, 'base64')
            let str = `
*KLIK LINK FOR DOWNLOAD*               
            
*Title:* ${res.data.result.title}
*Size:* ${res.data.result.size}
*Link:* ${res.data.result.url_audio}


_Download Sendiri, Jangan Manja :v_

*[ • SGDC-BOT • ]*
`.trim()
     conn.sendFile(m.chat, buf, 'SGDC-BOT.png', str, m)
        })
    })
   } catch (e) {
    m.reply('ERROR')
   }
}

handler.command = /^(ytmp3)$/i
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
