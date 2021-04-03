let fetch = require('node-fetch')

let handler = async(m, { conn, args, usedPrefix }) => {
  await m.reply('*[ WAIT ]* _Sedang Diproses..._')
    let str = `
*[ • SGDC-BOT • ]*
`.trim()
    
            fetch('https://raw.githubusercontent.com/Afdhan/Quo/main/file.txt')
            .then(res => res.text())
            .then(body => {
                let quo = body.split('\n')
                let islami = quo[Math.floor(Math.random() * quo.length)]
                conn.sendFile(m.chat, islami, '', 'Dasar Wibu:v', m)
            })
            .catch(() => {
                conn.reply(m.chat, '*[ ERROR ]* _Terjadi Kesalahan!_', m)
            })
    } /*else {
        conn.reply(m.chat, `Query tidak tersedia!. Silahkan ketik *${usedPrefix}anime* untuk melihat *List Query*`, m)
    }*/
//   } else if (!user.prems) m.reply('*FITUR INI KHUSUS UNTUK USER PREMIUM!*')
}
handler.command = /^(quotepict)$/i
handler.owner = false
handler.mods = false
handler.premium = true
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

//  MUHAMMAD AFDHAN

module.exports = handler
