switch{
let handler  = async (m, { conn }) => {
  conn.reply(m.chat, `${pickRandom(global.ssh)}\n\nThanks To @NEZAVPN\n\n*[ • SGDC-BOT • ]*`, m)
}

handler.command = /^(random(ssh)?|ssh)$/i


module.exports = handler
    break
let handler  = async (m, { conn, text }) => {
      let txt = m.quoted ? m.quoted.text ? m.quoted.text : text ? text : m.text : text ? text : m.text
      await global.ssh.push(txt)
      m.reply("Berhasil Menambahkan SSH")
}
handler.command = /^(addssh)$/i
handler.rowner = true
module.exports = handler

}
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.ssh = [
' Terimakasih Telah Menggunakan Layanan Kami\nInformasi Akun SSH & OpenVPN\nUsername       : sgdcbot\nPassword       : random\n===============================\nHost           : 137.116.144.40\nOpenSSH        : 22\nDropbear       : 109, 110, 143, 456\nSSL/TLS        : 222, 443, 777, 990\nPort Squid     : 80, 3128, 8080 (limit to IP SSH)\nOpenVPN        : TCP 1194 http://137.116.144.40:81/client-tcp-1194.ovpn\nOpenVPN        : UDP 2200 http://137.116.144.40:81/client-udp-2200.ovpn\nOpenVPN        : SSL 442 http://137.116.144.40:81/client-tcp-ssl.ovpn\nbadvpn         : 7100-7300\n===============================\nAktif Sampai   : May 09, 2021\nScript by Horasss\nroot@ferri02:~# ',
' Premium SSH Information\n===========================\nIP / Host : 23.101.228.24\nDomain    : neza.londodeso.xyz\nUsername  : sgdc\nPassword  : bot\nOpenSSH   : 22\nStunnel   : 443,990\nDropbear  : 110,143\nSquid     : 8080,3128\nBadVPN    : 7100-7200-7300\nCreated   : 09-04-2021\nExpired   : 09-05-2021\n=========================== ',
' Premium SSH Information\n===========================\nIP / Host : 23.101.228.24\nDomain    : neza.londodeso.xyz\nUsername  : bot\nPassword  : sgdc\nOpenSSH   : 22\nStunnel   : 443,990\nDropbear  : 110,143\nSquid     : 8080,3128\nBadVPN    : 7100-7200-7300\nCreated   : 09-04-2021\nExpired   : 09-05-2021\n===========================\nScript By Wildy Sheverando ',
]

