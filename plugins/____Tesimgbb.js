let imgBB = require("imgbb-uploader");
let ffmpeg = require('fluent-ffmpeg')
let { MessageType } = require('@adiwajshing/baileys')
let { exec } = require('child_process')
let fs = require('fs')
let axios = require("axios");
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  try {
   await m.reply('_Sedang Membuat... Mohon tunggu sekitar 1 menit_')
    const type = Object.keys(m.message)[0]
    const content = JSON.stringify(m.message)
    const isMedia = (type === 'imageMessage' || type === 'videoMessage')
    const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
    const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')

    var imgBB = require('imgbb-uploader')
    if ((isMedia && !m.message.videoMessage || isQuotedImage) && args.length == 0) {
      let ngntd = isQuotedImage ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
      let media = await conn.downloadAndSaveMediaMessage(ngntd)
      //let tels = body.slice(7)
      let anu = await imgBB("08579d070df9a07cb1c2ee565aece767", media)
      let res = 'https://videfikri.com/api/textmaker/customwp/?urlgbr=' + anu.display_url;
      /*let res = await axios.get(`https://videfikri.com/api/textmaker/customwp/?urlgbr=${anu.display_url}`)
      let hehe = res.data*/
        conn.reply(m.chat, res, 'TES.png', 'Nih Stah', m)
        } else {
        m.reply('Reply!')
       }
    } catch (e) {
 	m.reply('```ERROR```')
    throw e
 }
}

handler.command = /^(imgbb)$/i


module.exports = handler

// MUHAMMAD AFDHAN
