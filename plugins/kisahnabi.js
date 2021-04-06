let imageToBase64 = require('image-to-base64');
let axios = require("axios");
let handler = async(m, { conn, text }) => {
 if (!text) return conn.reply(m.chat, '_Masukkan Nama Nabi_', m)
  await m.reply('*[ WAIT ]* _Sedang Diproses.._')

    axios.get(`https://videfikri.com/api/religi/kisahnabi/?nabi=${text}`)
    .then((res) => {
     /* imageToBase64(res.data.image)
        .then(
          (ress) => {
            let buf = Buffer.from(ress, 'base64')*/
            let str = `
*HASIL SEARCHING*       
           
*Nama Nabi:* ${res.data.result.nama}
*Tahun Lahir:* ${res.data.result.tahun_kelahiran}
*Tempat Lahir:* ${res.data.result.tempat_lahir}
*Usia:* ${res.data.result.usia}
*Deskripsi:* 
${res.data.result.description}

*[ • SGDC-BOT • ]*
`.trim()
     conn.reply(m.chat, str, m)
        //})
    })
}

handler.command = /^(kisahnabi)$/i
handler.owner = false
handler.mods = false
handler.premium = true
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null


module.exports = handler

//  MUHAMMAD AFDHAN
