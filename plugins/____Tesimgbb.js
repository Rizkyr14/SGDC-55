let imgBB = require("imgbb-uploader");
let { MessageType } = require('@adiwajshing/baileys');
let { spawn } = require('child_process');
let path = require('path');
const { sticker } = require('../lib/sticker');
let fetch = require('node-fetch');
let util = require('util');
let fs = require('fs');
let axios = require("axios");
let handler = async(m, { conn, text, args, bot, command }) => {
    await m.reply('_Sedang Membuat... Mohon tunggu sekitar 1 menit_')
    const type = Object.keys(m.message)[0]
    const content = JSON.stringify(m.message)
    const isMedia = (type === 'imageMessage' || type === 'videoMessage')
    const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
    const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
  try {
    var imgBB = require('imgbb-uploader')
    if ((isMedia && !m.message.videoMessage || isQuotedImage) && args.length == 0) {
        ngntd = isQuotedImage ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
        media = await conn.downloadAndSaveMediaMessage(ngntd)
        anu = await imgBB("3ea1465ef91578a90ee81f7d41c59a1f", media)
        res = 'https://videfikri.com/api/textmaker/customwp/?urlgbr=' + anu.display_url;
     let triger = await fetch('https://some-random-api.ml/canvas/triggered?avatar=' + encodeURIComponent(anu.display_url));
     let img = await triger.buffer()
     let stiker = await sticker(img, false, global.packname, global.author)
     //   stic = await sticker(false, triger, global.packname, global.author)
       
     // let buff = await axios.get(`https://videfikri.com/api/textmaker/customwp/?urlgbr=${anu.display_url}`)
      //let hehe = res.data
        conn.sendFile(m.chat, res, 'TES.jpg', 'Nih Stah', m)                   
        conn.sendMessage(m.chat, stiker, MessageType.sticker, {
    quoted: m
  })
        } else {
        m.reply('Reply Fotonya!')
        }
    } catch (e) {
   m.reply('```ERROR! Terjadi Kesalahan```')
   // throw e
 }
}

handler.command = /^(customwp)$/i


module.exports = handler

// MUHAMMAD AFDHAN
