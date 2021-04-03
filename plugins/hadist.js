let axios = require("axios");
let handler = async(m, { conn, text }) => {

let [nm, no] = text.split `|`
    if (!nm) return conn.reply(m.chat, '_Masukkan Nama Perawi Hadist_', m)
    if (!no) return conn.reply(m.chat, '_Masukkan Nomor Hadist_', m)
    
    await m.reply('*[ WAIT ]* _Searching..._')
	axios.get(`https://xnxx-tbot.herokuapp.com/api/hadits?kitab=${nm}&nomor=${no}&apikey=tbot`).then ((res) => {
	 	let hasil = `
*${res.data.result.message}*

*Arab:*
${res.data.result.contents.arab}

*Translation:*
${res.data.result.contents.id}


*[ • SGDC-BOT • ]*
`.trim()
   conn.reply(m.chat, hasil, m)
	})
}

handler.command = /^(hadist(shahih)?)$/i
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
