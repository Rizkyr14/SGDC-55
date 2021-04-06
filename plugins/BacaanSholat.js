let axios = require("axios");
let handler = async(m, { conn, text }) => {

            await m.reply('*[ WAIT ]* _Sedang Diproses..._')
            axios.get(`https://xnxx-tbot.herokuapp.com/api/muslim/bacaanshalat?apikey=tbot`).then ((res) => {
               // let doa = res.data.result
                let out = `*「  BACAAN SHALAT  」*\n\n`
                for (let i = 0; i < res.data.result.length; i++) {
                    out += `─────────────────────\n*○ ${res.data.result[i].name}*\n*Arab:*\n${res.data.result[i].arabic}\n*Latin:*\n${res.data.result[i].latin}\n\n*Artinya:*\n${res.data.result[i].terjemahan}\n`
                }
                    out += '\n\n*[ • SGDC-BOT • ]*'
                 conn.reply(m.chat, out, m)
	})
}
handler.command = /^(doashalat|doasalat|doasolat|bacaanshalat|bacaansholat|bacaansolat)$/i
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
