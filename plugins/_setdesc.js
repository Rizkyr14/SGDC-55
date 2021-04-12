let handler = async (m, { conn, args, text, isBotAdmin, isAdmin }) => {

			    if (!isAdmin) return m.reply('_Anda Siapa?_')
				if (!isBotAdmin) return m.reply('_SGDC-BOT Harus Jadi Admin!_')
                conn.groupUpdateDescription(m.chat, `${text}`)
                conn.reply(m.chat, '_Berhasil Mengganti Deskripsi Grup!_', m)
                
handler.command = /^(setdesc)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = true
handler.botAdmin = true

handler.fail = null

module.exports = handler

