let axios = require("axios");
let handler = async(m, { conn, text }) => {

    if (!text) return conn.reply(m.chat, '_Masukkan Nama Kota/Kecamatan_', m)

  await m.reply('*[ WAIT ]* _Searching..._')
	axios.get(`https://videfikri.com/api/kodepos/?query=${text}`).then ((res) => {
	 	let hasil = `
*HASIL SEARCHING*
	
*Provinsi:* ${res.data.result.provinsi}
*Kota:* ${res.data.result.kota}
*Kecamatan:* ${res.data.result.kecamatan}
*Kelurahan:* ${res.data.result.kelurahan}
*Kode Pos:* ${res.data.result.kodepos}

*[ • SGDC-BOT • ]*
`.trim()

    conn.reply(m.chat, hasil, m)
	})
}

handler.command = /^(kodepos)$/i
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
