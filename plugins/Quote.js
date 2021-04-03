let imageToBase64 = require('image-to-base64');
let axios = require("axios");
let handler = async(m, { conn, text }) => {
  await m.reply('*[ WAIT ]* _Sedang Diproses..._')
    let str = `
*[ • SGDC-BOT • ]*
`.trim()
    
    axios.get(`https://raw.githubusercontent.com/Afdhan/Quo/main/file.txt`)
      .then((result) => {
        let b = JSON.parse(JSON.stringify(result.data));
        let dhan =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(dhan)
        .then(
            (response) => {
	let buf = Buffer.from(response, 'base64');

    conn.sendFile(m.chat, buf, 'QUOTES-MUSLIM.png', str, m)
            }
        )
        .catch(
            (error) => {
                console.log(error); 
            }
        )
    
    });
}

handler.command = /^(quotepict)$/i
handler.owner = false
handler.mods = false
handler.premium = true
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

//  MUHAMMAD AFDHAN

module.exports = handler
