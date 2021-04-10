let axios = require("axios");
let handler = async(m, { conn, text }) => {
            if (!text) return conn.reply(m.chat, 'Apa Yang Mau Dicek?', m)
            let api = 'USNLUCLF'
            await m.reply('*[ • WAIT • ]* _Searching..._')
            axios.get(`https://leyscoders-api.herokuapp.com/api/halal?q=${text}&apikey=${api}`).then ((res) => {
                let mui = res.data
                let muii = `*「  INFO MUI HALAL  」*\n\n`
                for (let i = 0; i < mui.result.length; i++) {
                    muii += `─────────────────\n${mui.result[i].hasil}\n`
                }
                    muii += '*[ • SGDC-BOT • ]*'
                 conn.reply(m.chat, sfile, m)
	})
}
handler.command = /^(cekhalal)$/i
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
