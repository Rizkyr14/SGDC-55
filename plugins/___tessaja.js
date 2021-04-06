let handler = async (m, { conn, args }) => {
   let user = { message: { [m.quoted.mtype]: m.quoted }}
   await conn.groupRemove(m.chat, [user])
}
handler.customPrefix = /^kill $/i
handler.command = new RegExp
handler.owner = true


module.exports = handler

