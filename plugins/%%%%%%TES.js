const fetch = require('node-fetch')
const FormData = require('form-data')
const { MessageType } = require('@adiwajshing/baileys')
const imageToBase64 = require('image-to-base64');
const axios = require("axios");
let handler  = async (m, { conn, text }) => {
	if (!text) return m.reply('_Masukkan Teks_')
	if (text.length > 15) return m.reply('_Teks Kepanjangan!_')
//let api = 'abba3220ce4a347f'
	  await m.reply('*[ WAIT ]* _Sedang Diproses..._')
	 await axios.get('https://api.xteam.xyz/sticker/stickerly?q=' + text + '&APIKEY=abba3220ce4a347f')
	.then((res) => {
	let bau = res.data.result
        let b = JSON.parse(JSON.stringify(bau.stickerlist));
        let mmk =  b[Math.floor(Math.random() * b.length)];
    /*let img = await mmk.buffer()
    if (!img) throw img
    let stiker = await sticker(img)*/
        imageToBase64(mmk)
        .then(
            (response) => {
	let buf = Buffer.from(response, 'base64');
        let knt = encodeURIComponent(buf)
    conn.sendMessage(m.chat, knt, MessageType.sticker, { quoted: m })
             }
        )
        .catch(
            (error) => {
                console.log(error); 
            }
        )
    
    });
}	      
handler.command = /^(tod)$/i

handler.botAdmin = false

handler.fail = null

//  MUHAMMAD AFDHAN

module.exports = handler
