let axios = require("axios");
let handler = async(m, { conn, text }) => {

  await m.reply('*[ WAIT ]* _Searching..._')
	axios.get(`https://xnxx-tbot.herokuapp.com/api/muslim/ayatkursi?apikey=tbot`).then ((res) => {
	 	let hasil = `
*AYAT KURSI*
	
*Arab:* 
${res.data.result.data.arabic}
*Latin:* 
${res.data.result.latin}
*Translation:*
${res.data.result.translation}

*Tafsir:*
${res.data.result.tafsir}


*[ • SGDC-BOT • ]*
`.trim()

    conn.reply(m.chat, hasil, m)
	})
}

handler.command = /^(ayatkursi)$/i
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
