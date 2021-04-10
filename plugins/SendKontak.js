let handler = function (m, {conn, text }) {
//let [mmek, kntl] = text.split ` `
//        if (!mmek) return m.reply('_Tag Salah Satu Stah!_')

//if (!kntl) return m.reply('_Dia Gapunya Nama Ya??_')
	
	
	
       // let name = conn.getName(m.mentionedJid)
//let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
	var no = m.mentionedJid[0]
	let nom = '${no.split("@s.whatsapp.net")[0]}'

  this.sendContact(m.chat, nom, `${text}`, m)/*, { 
	  contextInfo: { 
		  mentionedJid: [users] 
	  } 
    })*/
}
handler.command = /^(sendkontak|kontak)$/i

handler.fail = null

module.exports = handler
