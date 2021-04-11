let fetch = require('node-fetch')
let axios = require("axios");
let handler = async (m, { conn, text }) => {
let chat = global.DATABASE.data.chats[m.chat]
if (chat.simi) {
        let res = await axios.get(`https://simsumi.herokuapp.com/api?text=${text}&lang=id`)
        conn.reply(m.chat, res.data.success, m)
  } else throw '*SIMI BELUM DIAKTIFKAN UNTUK CHAT INI!*'
}

handler.customPrefix = /^! /
//handler.command = new RegExp
handler.command = /(?:)/i


handler.fail = null

module.exports = handler
