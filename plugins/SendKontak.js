let { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text, args }) => {
	let [mmek, kntl] = args.join` `
    if (!mmek) return m.reply('_Tag Salah Satu Stah!_')
	if (!kntl) return m.reply('_Dia Gapunya Nama Ya??_')
	
	let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
	var no = m.mentionedJid[0]
	let nom = no.split("@s.whatsapp.net")[0]

  conn.sendMessage(m.chat, `${nom}`, `${kntl}`, MessageType.contact, { contextInfo: { mentionedJid: users } })
}
handler.command = /^(sendkontak|kontak)$/i

handler.fail = null

module.exports = handler
