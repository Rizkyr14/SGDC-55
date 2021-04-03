let axios = require("axios");
let handler = async(m, { conn, text }) => {

let txt = m.quoted ? m.quoted.text ? m.quoted.text : text ? text : m.text : text ? text : m.text
    if (!txt) return conn.reply(m.chat, 'Masukkan IP adress', m)

  await m.reply('*[ WAIT ]* _Searching..._')
	axios.get(`https://videfikri.com/api/iplookup/?ip=${txt}`).then ((res) => {
	 	let hasil = `
*HASIL SEARCHING*
	
*IP Adress:* ${res.data.result.ip}
*City:* ${res.data.result.city}
*Region:* ${res.data.result.region}
*Region Name:* ${res.data.result.region_name}
*Country:* ${res.data.result.country}
*Country Code:* ${res.data.result.country_code}
*Latitude:* ${res.data.result.latitude}
*Longtitude:* ${res.data.result.longtitude}
*TimeZone:* ${res.data.result.timezone}
*ISP:* ${res.data.result.isp}
*ORG:* ${res.data.result.org}
*AS:* ${res.data.result.as}

*[ • SGDC-BOT • ]*
`.trim()

    conn.reply(m.chat, hasil, m)
	})
}

handler.command = /^(whois)$/i
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
