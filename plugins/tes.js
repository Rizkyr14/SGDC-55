let handler = async(m, { conn, participant }) => {
    if (m.key.fromMe) return
    let chat = global.DATABASE._data.chats[m.key.remoteJid]
    if (chat.delete) return
    await conn.reply(m.key.remoteJid, `
*_Terdeteksi @${m.participant.split`@`[0]} telah menghapus pesan!_*

*[ • SGDC-BOT • ] _Detector_*
`.trim(), m.message, {
      contextInfo: {
        mentionedJid: [m.participant]
      }
    })
    conn.copyNForward(m.key.remoteJid, m.message).catch(e => console.log(e, m))
 // }
}

module.exports = handler
