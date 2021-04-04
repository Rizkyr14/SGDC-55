let axios = require("axios");
let handler = async(m, { conn, text }) => {
if (!text) return conn.reply(m.chat, '_Masukkan Nomor Surah_', m)
  await m.reply('*[ WAIT ]* _Searching..._')
	axios.get(`https://api.zeks.xyz/api/quran?no=${text}&apikey=apivinz`).then ((res) => {
	 	let hasil = `*HASIL SEARCHING*\n\n*Nomor:* ${res.data.no}\n*Surah:* ${res.data.surah}\n*Asma:* ${res.data.asma}\n*Tipe:* ${res.data.type}
*Jumlah Ayat:* ${res.data.jumlah_ayat}\n*Keterangan:*\n${res.data.ket}\n\n*Audio:*\n${res.data.audio}\n\n_Klik Link Diatas Jika Ingin Mendengarkan Surah ${res.data.surah}_\n`
             for (let i = 0; i < res.data.ayat.length; i++) {
                    hasil += `\n─────────────────\n\n• *Ayat:* ${res.data.ayat[i].number}\n${res.data.ayat[i].text}\n\n• *Artinya:* ${res.data.ayat[i].translation_id}\n`
              }


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
