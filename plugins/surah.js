let axios = require("axios");
let handler = async(m, { conn, text }) => {
if (!text) return conn.reply(m.chat, '_Masukkan Nomor Surah_', m)
  await m.reply('*[ WAIT ]* _Searching..._')
	axios.get(`https://api.zeks.xyz/api/quran?no=${text}&apikey=apivinz`).then ((res) => {
	 	let hasil = `
*HASIL SEARCHING*
	
*Nomor:* ${res.data.no}
*Surah:* ${res.data.surah}
*Asma:* ${res.data.asma}
*Tipe:* ${res.data.type}
*Jumlah Ayat:* ${res.data.jumlah_ayat}
*Keterangan:*
${res.data.ket}

*Audio:*
${res.data.audio}

_Klik Link Diatas Jika Ingin Mendengarkan Surah ${res.data.surah}_

*[ • SGDC-BOT • ]*
`.trim()

    conn.reply(m.chat, hasil, m)
	})
}

handler.command = /^(getsurah)$/i
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
