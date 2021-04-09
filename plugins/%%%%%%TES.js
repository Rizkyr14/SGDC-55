const { MessageType } = require('@adiwajshing/baileys')

let handler = async(m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, '_Masukkan Text Laporan!_', m)
    if (text > 200) return conn.reply(m.chat, '_Teks Terlalu Panjang!, Maksimal 200 Karakter_', m)
    /*let name = conn.getName(m.sender)
    var nomor = m.sender
    const reprot = `
*╭══════[ REPORT ]══════╮*
~ • Nama: ${name}
~ • Nomor: wa.me/${nomor.split("@s.whatsapp.net")[0]}
~ • Laporan: ${text}
*╰═════════════════╯*
`.trim()*/
    conn.sendMessage('0@s.whatsapp.net', `${text}`, MessageType.text)
   // conn.reply(m.chat, '_Masalah telah di laporkan ke Owner *SGDC-BOT*_', m)
}               


handler.command = /^(mark)$/i

handler.botAdmin = false

handler.fail = null

//  MUHAMMAD AFDHAN

module.exports = handler
