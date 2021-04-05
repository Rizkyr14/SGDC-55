let axios = require("axios");
let handler = async(m, { conn, text }) => {
        //    if (!text) return conn.reply(m.chat, 'Apa Yang Mau Dicari?', m)
            
            await m.reply('*[ WAIT ]* _Sedang Diproses..._')
            axios.get(`https://xnxx-tbot.herokuapp.com/api/muslim/doaharian?apikey=tbot`).then ((res) => {
                let doa = res.data.result
                let out = `*「  DO'A HARIAN  」*\n\n`
                for (let i = 0; i < doa.data.length; i++) {
                    out += `\n─────────────────────\n*${doa.data[i].title}:*\n${doa.data[i].arabic}\n*Latin:*\n${doa.data[i].latin}\n*Artinya*\n${doa.data[i].translation}\n`
                }
                    out += '\n\n*[ • SGDC-BOT • ]*'
                 conn.reply(m.chat, out, m)
	})
}
handler.command = /^(doaharian)$/i
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
