const { MessageType } = require('@adiwajshing/baileys')
let handler = async function(m, { conn , args, text, isAdmin, isBotAdmin, groupMetadata }) {

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let bott = '6283159600193@s.whatsapp.net'
  let asu = m.sender
  let vir = asu.split("@s.whatsapp.net")[0]
  if (!m.isGroup) { 
    m.reply('_BAPAK LO JAGOAN MANA ANJING !?!?_')
  } else {
  	if (isAdmin) return m.reply('*ADMIN KONTOL!*')
    await conn.reply(m.chat, `
*[ CHAT ANTI VIRTEX ]*

_Terdeteksi *@${asu.split("@")[0]}* telah mengirim virtex!_

Maaf Kamu akan dikick oleh *@${bott.split("@")[0]}*
`.trim(), m, { 
      contextInfo: {  
        mentionedJid: [asu, bott]
      }
    })
 if (isBotAdmin) {
   conn.groupRemove(m.chat, [asu])
     } else { 
     	m.reply('```JADIKAN BOT SEBAGAI ADMIN !!!```')
    }
  } conn.sendMessage(vir + '@s.whatsapp.net', `${m.text}`, MessageType.text)
}
handler.customPrefix = /(๒๒๒๒๒๒|♚㜸ཽཽࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧ͢͢㜺ࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧ㜸ཽཽཽ͢͢͢♚|🧙‍♂️𝐀𝐥𝐚𝐤𝐚𝐳𝐚𝐦🔮|𝐗-𝐕𝐢𝐫𝐮𝐬)/i
handler.command = new RegExp

handler.fail = null

module.exports = handler
// by Muhammad Afdhan
// INI WM KU
