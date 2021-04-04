const fetch = require('node-fetch')
const FormData = require('form-data')

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Tidak ada foto'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
  let img = await q.download()
  let body = new FormData
  body.append('image', img, 'image')
  let res = await fetch(`https://api.xteam.xyz/removebg?url=https:\/\/i.pinimg.com\/originals\/a4\/be\/64\/a4be64e6a134bf3b24ff7d6d2476a1bb.jpg&APIKEY=abba3220ce4a347f`, {
    method: 'POST',
    body
  })
  if (res.status !== 200) throw await res.json()
  await conn.sendFile(m.chat, await res.buffer(), 'hd.jpg', 'Nih HD ga?\n\n*[ • SGDC-BOT • ]*', m)
}

handler.command = /^(tes)$/i
handler.premium = true
module.exports = handler
