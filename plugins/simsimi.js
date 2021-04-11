let fetch = require('node-fetch')
let handler = async (m, { text }) => {
let chat = global.DATABASE.data.chats[m.chat]
if (chat.simi) {
	axios.get(`https://simsumi.herokuapp.com/api?text=${text}&lang=id`).then ((res) => {
	if (res.data.success) conn.reply(m.chat, `${res.data.seccess}`, m)
    else throw 'Ngomong Apa?'
    } else m.reply('*SIMI BELUM DIAKTIFKAN UNTUK CHAT INI!*')
}

handler.customPrefix = /^! /
//handler.command = new RegExp
handler.command = /(?:)/i


handler.fail = null

module.exports = handler