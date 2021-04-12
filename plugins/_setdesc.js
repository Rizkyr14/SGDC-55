let handler = async (m, { conn, args, text, isBotAdmin, isAdmin }) => {
        if (!text) return m.reply('Masukkan Teks')
        if (!isAdmin) return m.reply('_Anda Siapa?_')
	if (!isBotAdmin) return m.reply('_SGDC-BOT Harus Jadi Admin!_')
        await conn.groupUpdateDescription(m.chat, `${text}`)
        conn.reply(m.chat, '_Berhasil Mengganti Deskripsi Grup!_', m)
 }            
handler.command = /^(setdesc|setdesk)$/i

handler.group = true

handler.fail = null

module.exports = handler

