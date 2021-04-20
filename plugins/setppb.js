const { spawn } = require('child_process')
const util = require('util')
let {
Presence, 
downloadAndSaveMediaMessage,
updateProfilePicture,
MessageType
} = require('@adiwajshing/baileys')

let handler  = async (m, { conn, args, bot, usedPrefix, command }) => {
				    conn.updatePresence(m.chat, Presence.composing) 
				await m.reply('Wait....')
				  let q = m.quoted ? m.quoted : m //{ message: { [m.quoted.mtype]: m.quoted }}//.replace('m.quoted')
				 //let q = JSON.stringify(m).replace('quotedM','m'))//.message.extendedTextMessage.contextInfo
				  let pp = conn.downloadAndSaveMediaMessage(q)
	                //let pp = await conn.downloadM(q)
	               conn.updateProfilePicture(bot, pp)
	
	
					/*media = await conn.downloadAndSaveMediaMessage(enmedia)
					await conn.updateProfilePicture(botNumber, media)
					m.reply('_Success Change Profile Picture!_')*/
}
/*
handler.command = /^setpp$/i
handler.owner = true
 */
//module.exports = handler
