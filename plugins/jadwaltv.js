let axios = require("axios");
let handler = async(m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, '_Masukkan Nama Channel_', m)
    
    await m.reply('*[ WAIT ]* _Searching..._')
	axios.get(`https://api.zeks.xyz/api/jadwaltv?channel=${text}&apikey=apivinz`).then ((res) => {
	 	let hasil = `
*Jadwal Hari Ini*

${res.data.result}

*[ • SGDC-BOT • ]*
`.trim()
   conn.reply(m.chat, hasil, m)
	})
}

handler.command = /^(jadwal(tv)?)$/i
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
