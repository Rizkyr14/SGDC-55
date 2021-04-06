let handler = async (m, { conn, args }) => {
   let user = m.quoted ? m.quoted : m
   await conn.groupRemove(m.chat, [user])
}
handler.customPrefix = /^kill $/i
handler.command = new RegExp
handler.owner = true


module.exports = handler

