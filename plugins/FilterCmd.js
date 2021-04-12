let handler = (m, { conn, usedPrefix, command }) => {
let name = conn.getName(m.sender)
//let peler = m.sender
 m.reply(`
_Maaf ${name}!, Perintah *${m.text}* tidak terdaftar di *${usedPrefix}menu*_
`.trim())
}
handler.command = new RegExp

module.exports = handler
