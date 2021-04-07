const fetch = require('node-fetch')
const FormData = require('form-data')
const { MessageType } = require('@adiwajshing/baileys')
const imageToBase64 = require('image-to-base64');
let handler  = async (m, { conn, text }) => {
	if (!text) return m.reply('_Masukkan Teks_')
	if (text.length > 15) return m.reply('_Teks Kepanjangan!_')
	let api = 'abba3220ce4a347f'
	  await m.reply('*[ WAIT ]* _Sedang Diproses..._')
	let res = await fetch('https://api.xteam.xyz/sticker/stickerly?q=' + encodeURIComponent(text) + '&APIKEY=${api}')
	.then((res) => {
		let bau = res.data.result
        let b = JSON.parse(JSON.stringify(bau.stickerlist));
        let mmk =  b[Math.floor(Math.random() * b.length)];
    let img = await mmk.buffer()
    if (!img) throw img
    let stiker = await sticker(img)

    conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
  }
}
	      
handler.command = /^(tod)$/i

handler.botAdmin = false

handler.fail = null

//  MUHAMMAD AFDHAN

module.exports = handler
