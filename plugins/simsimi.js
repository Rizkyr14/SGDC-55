let fetch = require('node-fetch')
let handler = async (m, { text }) => {
let chat = global.DATABASE.data.chats[m.chat]
if (chat.simi) {
	let res = await fetch('https://simsumi.herokuapp.com/api?text=${text}&lang=id')
	let json = await res.json()
	if (json.status) m.reply(json.seccess)
    else throw 'Ngomong Apa?'
    } else m.reply('*SIMI BELUM DIAKTIFKAN UNTUK CHAT INI!*')
}

handler.customPrefix = /^! /
//handler.command = new RegExp
handler.command = /(?:)/i


handler.fail = null

module.exports = handler