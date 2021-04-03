let imageToBase64 = require('image-to-base64');
let axios = require("axios");
let handler = async(m, { conn, text }) => {
 if (!text) return conn.reply(m.chat, '_Masukkan Judul Video_', m)
  await m.reply('*[ WAIT ]* _Sedang Diproses.._')

    axios.get(`https://fzn-gaz.herokuapp.com/api/ytmp3v2?judul=${text}`)
    .then((res) => {
      imageToBase64(res.data.image)
        .then(
          (ress) => {
            let buf = Buffer.from(ress, 'base64')
            let str = `
*KLIK LINK FOR DOWNLOAD*               
            
*Title:* ${res.data.title}
*Size:* ${res.data.size}
*Link:* ${res.data.result}


_Download Sendiri, Jangan Manja :v_

*[ • SGDC-BOT • ]*
`.trim()
     conn.sendFile(m.chat, buf, 'SGDC-BOT.png', str, m)
        })
    })
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