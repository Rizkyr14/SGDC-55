let handler = async function(m, { conn , args, isAdmin, isBotAdmin, usedPrefix }) {

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let usname = conn.getName(who)
  let mentionedJid = [m.sender]
  let name = m.fromMe ? conn.user : conn.contacts[m.sender]
  let ajg = m.sender
  let bott = '6283159600193@s.whatsapp.net'
  let chat = global.DATABASE.data.chats[m.chat]
 if(!m.isGroup) return false   //m.reply(`Ingin Memasukkan BOT Ke Grup?  `)
 if (chat.antiLink && m.isGroup) {
 if (m.isBaileys && m.fromMe) throw false
 if (isAdmin) return m.reply('_Kali ini anda aman! Karena anda adalah Admin !!!_')
 await conn.reply(m.chat, `
*[ CHAT ANTI LINK ]*

_Terdeteksi *@${ajg.split("@")[0]}* telah mengirim link group!_

Maaf Kamu akan dikick oleh *@${bott.split("@")[0]}*
`.trim(), m, { 
   contextInfo: { 
     mentionedJid: [ajg, bott]
   } 
 })
 if(isBotAdmin) { 
   conn.groupRemove(m.chat, [ajg])
    } else if (!isBotAdmin) return m.reply('_Jadikan SGDC-BOT Sebagai Admin, Agar Bisa Bertindak !!!_')
    } else {
      m.reply('```AKTIFIN ANTILINK! BIAR GUA ULTI NI BOCAH !!!```')
    }
 }

handler.customPrefix = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
handler.command = new RegExp

handler.fail = null

module.exports = handler
