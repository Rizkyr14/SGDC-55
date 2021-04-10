let handler = function (m, { conn, text }) {
	let [m.mentionedJid, kntl] = text.split `|`
    if (!m.mentionedJid) return m.reply('_Tag Salah Satu Stah!_')
	if (!kntl) return m.reply('_Dia Gapunya Nama Ya??_')
	
	let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
	var no = m.mentionedJid[0]
	let nom = no.split("@s.whatsapp.net")[0]

  this.sendContact(m.chat, `${nom`, ${kntl}`, m, { contextInfo: { mentionedJid: [users] } })

handler.command = /^(sendkontak|kontak)$/i

handler.fail = null

module.exports = handler
