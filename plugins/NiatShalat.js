let axios = require("axios");
let handler = async(m, { conn, text }) => {
        //    if (!text) return conn.reply(m.chat, 'Apa Yang Mau Dicari?', m)
            
            await m.reply('*[ WAIT ]* _Sedang Diproses..._')
            axios.get(`https://xnxx-tbot.herokuapp.com/api/muslim/niatshalat?apikey=tbot`).then ((res) => {
                //let doa = res.data.result
                let meme = `*「  NIAT SHOLAT  」*\n\n`
                for (let i = 0; i < res.data.result.length; i++) {
                    meme += `\n─────────────────────\n\n*~ Nama:* ${res.data.result[i].name}*\n*~ Arab:*\n${res.data.result[i].arabic}\n*~ Latin:*\n${res.data.result[i].latin}\n`
                }
                    meme += '\n*[ • SGDC-BOT • ]*'
                 conn.reply(m.chat, meme, m)
	})
}
handler.command = /^(niatshalat|niatsholat|niatsolat)$/i
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
