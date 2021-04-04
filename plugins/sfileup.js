let axios = require("axios");
let handler = async(m, { conn, text }) => {
        //    if (!text) return conn.reply(m.chat, 'Apa Yang Mau Dicari?', m)
            
            await m.reply('*[ WAIT ]* _Sedang Diproses..._')
            axios.get(`https://fzn-gaz.herokuapp.com/api/sfileup`).then ((res) => {
                let sfiles = res.data
                let sfile = `*「  SFILE LATEST UPLOAD  」*\n\n`
                for (let i = 0; i < sfiles.result.length; i++) {
                    sfile += `─────────────────\n• *Title:* ${sfiles.result[i].title}\n• *Size:* ${sfiles.result[i].size}\n• *Link:* ${sfiles.result[i].link}\n`
                }
                 conn.reply(m.chat, sfile, m)
	})
}
handler.command = /^(sfileup)$/i
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
