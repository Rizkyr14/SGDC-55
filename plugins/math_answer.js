let handler = async (m, { conn }) => {
  let id = m.chat
  if (!m.quoted || m.quoted.sender != conn.user.jid || !/^Berapa hasil dari/i.test(m.quoted.text)) throw false
  conn.math = conn.math ? conn.math : {}
  if (!(id in conn.math)) throw '_Lu telat ngen' + readMore + '(uhh) :v_'
  if (m.quoted.id == conn.math[id][0].id) {
  let math = JSON.parse(JSON.stringify(conn.math[id][1]))
  if (m.text == math.result) {
    global.DATABASE._data.users[m.sender].exp += math.bonus
    clearTimeout(conn.math[id][3])
    delete conn.math[id]
    throw `*Jawaban Benar!* _Selamat A${readMore}nda Tidak Mendapatkan Apa-Apa :D`
  } else {
    if (--conn.math[id][2] == 0) {
      clearTimeout(conn.math[id][3])
      delete conn.math[id]
      throw `*Kesempatan Habis!* _Jawabannya *${math.result}*_`
    } else throw `*Jawaban Salah!* _Masih Ada *${conn.math[id][2]}* Kesempatan_`
  }
 }
}
handler.customPrefix = /^-?[0-9]+(\.[0-9]+)?$/
handler.command = new RegExp


module.exports = handler


const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)