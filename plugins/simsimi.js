let fetch = require('node-fetch')
let axios = require("axios");
let handler = async (m, { conn, text }) => {
let chat = global.DATABASE.data.chats[m.chat]
if (chat.simi) {
        let res = await fetch(`https://videfikri.com/api/simsimi/?teks=${text}`)
        let json = await res.json()
  if (json.result) conn.reply(m.chat, json.result.jawaban, m)
  else throw 'ERROR'
  } else throw '*SIMI BELUM DIAKTIFKAN UNTUK CHAT INI!*'
}

handler.customPrefix = /^! /
//handler.command = new RegExp
handler.command = /(?:)/i


handler.fail = null

module.exports = handler
