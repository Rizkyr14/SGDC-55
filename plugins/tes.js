let handler = async(m, { delete, conn, participant }) => {
    if (m.key.fromMe) return
    let chat = global.DATABASE._data.chats[m.key.remoteJid]
    if (chat.delete) return
    await this.reply(m.key.remoteJid, `
*_Terdeteksi @${m.participant.split`@`[0]} telah menghapus pesan!_*

*[ • SGDC-BOT • ] _Detector_*
`.trim(), m.message, {
      contextInfo: {
        mentionedJid: [m.participant]
      }
    })
    this.copyNForward(m.key.remoteJid, m.message).catch(e => console.log(e, m))
  }
}

module.exports = handler
