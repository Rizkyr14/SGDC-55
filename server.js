require('./config.js')
let { WAConnection: _WAConnection, WA_MESSAGE_STUB_TYPES } = require('@adiwajshing/baileys')
let { generate } = require('qrcode-terminal')
let qrcode = require('qrcode')
let simple = require('./lib/simple')
//  let logs = require('./lib/logs')
let yargs = require('yargs/yargs')
let syntaxerror = require('syntax-error')
let fetch = require('node-fetch')
let chalk = require('chalk')
let fs = require('fs')
let path = require('path')
let util = require('util')
let { spawnSync } = require('child_process')
let Readline = require('readline')
let rl = Readline.createInterface(process.stdin, process.stdout)
let WAConnection = simple.WAConnection(_WAConnection)

/*
global.owner = ['6282252655313']
global.mods = []
global.prems = []
global.APIs = { 
  nrtm: 'https://nurutomo.herokuapp.com',
  xteam: 'https://api.xteam.xyz'
}
global.APIKeys = { 
  'https://api.xteam.xyz': 'test'
}
*/

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '')
global.timestamp = {
  start: new Date
}
// global.LOGGER = logs()
const PORT = process.env.PORT || 3000
let opts = yargs(process.argv.slice(2)).exitProcess(false).parse()
global.opts = Object.freeze({...opts})
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎!^#$?¥\/%+×1¥07*-,@ZQ.') + ']')

global.DATABASE = new (require('./lib/database'))(`${opts._[0] ? opts._[0] + '_' : ''}database.json`, null, 2)
if (!global.DATABASE.data.users) global.DATABASE.data = {
  users: {},
  groups: {},
  chats: {},
  stats: {},
}
if (!global.DATABASE.data.groups) global.DATABASE.data.groups = {}
if (!global.DATABASE.data.chats) global.DATABASE.data.chats = {}
if (!global.DATABASE.data.stats) global.DATABASE.data.stats = {}
if (opts['server']) {
  let express = require('express')
  global.app = express()
  app.all('*', async (req, res) => {
    await global.conn.connect().catch(console.log)
    res.end(await qrcode.toBuffer(global.qr))
  })
  app.listen(PORT, () => console.log('App listened on port', PORT))
}
global.conn = new WAConnection()
let authFile = `${opts._[0] || 'session'}.data.json`
if (fs.existsSync(authFile)) conn.loadAuthInfo(authFile)
if (opts['big-qr'] || opts['server']) conn.on('qr', qr => generate(qr, { small: false }))
if (opts['server']) conn.on('qr', qr => { global.qr = qr })
conn.on('credentials-updated', () => fs.writeFileSync(authFile, JSON.stringify(conn.base64EncodedAuthInfo())))
let lastJSON = JSON.stringify(global.DATABASE.data)
if (!opts['test']) setInterval(() => {
  conn.logger.info('[ • SGDC-BOT • ] Saving Database...')
  if (JSON.stringify(global.DATABASE.data) == lastJSON) conn.logger.info('[ • SGDC-BOT • ] Database Updated!')
  else {
    global.DATABASE.save()
    conn.logger.info('[ • SGDC-BOT • ] Success Database Saved!')
    lastJSON = JSON.stringify(global.DATABASE.data)
  }
}, 60 * 1000)

const isNumber = x => typeof x === 'number' && !isNaN(x)
conn.handler = async function (m) {
  try {
  	simple.smsg(this, m)
    m.exp = 0
    m.limit = false
    try {
      let user
      if (user = global.DATABASE._data.users[m.sender]) {
        if (!isNumber(user.exp)) user.exp = 0
        if (!isNumber(user.limit)) user.limit = 10
        if (!isNumber(user.lastclaim)) user.lastclaim = 0
        if (!'registered' in user) user.registered = true
        if (!user.registered) {
          if (!'name' in user) user.name = this.getName(m.sender)
          if (!isNumber(user.age)) user.age = -1
          if (!isNumber(user.regTime)) user.regTime = -1
         }
          if (!isNumber(user.afk)) user.afk = -1
          if (!'afkReason' in user) user.afkReason = ''
          if (!'banned' in user) user.banned = false
         } else global.DATABASE._data.users[m.sender] = {
          exp: 0,
          limit: 100,
          lastclaim: 0,
          registered: false,
          name: this.getName(m.sender),
          age: -1,
          regTime: -1,
          afk: -1,
          afkReason: '',
          banned: false,
        }
      
      let chat
        if (chat = global.DATABASE._data.chats[m.chat]) {
          if (!'isBanned' in chat) chat.isBanned = false
          if (!'welcome' in chat) chat.welcome = false
          if (!'sWelcome' in chat) chat.sWelcome = ''
          if (!'sBye' in chat) chat.sBye = ''
          if (!'delete' in chat) chat.delete = false
          if (!'antiLink' in chat) chat.antiLink = false
          if (!'badWord' in chat) chat.badWord = false
          if (!'simi' in chat) chat.simi = false
          if (!'nsfw' in chat) chat.nsfw = false
        } else global.DATABASE._data.chats[m.chat] = {
          isBanned: false,
          welcome: false,
          sWelcome: '',
          sBye: '',
          delete: false,
          antiLink: false,
          badWord: false,
          simi: false,
          nsfw: false,
        }
    } catch (e) {
      console.log(e, global.DATABASE.data)
    }
    if (!m.fromMe && opts['self']) return
    if (!m.text) return
    if (m.isBaileys) return
    m.exp += 1
    
  	let usedPrefix
    let user = global.DATABASE._data.users[m.sender]
  	for (let name in global.plugins) {
  	  let plugin = global.plugins[name]
      if (!plugin) continue
      if (!opts['restrict']) if (plugin.tags && plugin.tags.includes('admin')) continue
      let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
  	  if ((usedPrefix = (_prefix.exec(m.text) || '')[0])) {
        let noPrefix = m.text.replace(usedPrefix, '')
  		  let [command, ...args] = noPrefix.trim().split` `.filter(v=>v)
        args = args || []
        let _args = noPrefix.trim().split` `.slice(1)
        let text = _args.join` `
  		  command = (command || '').toLowerCase()
        let isROwner = [global.conn.user.jid, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        let isOwner = isROwner || m.fromMe

  			let isAccept = plugin.command instanceof RegExp ? 
          plugin.command.test(command) :
          Array.isArray(plugin.command) ?
            plugin.command.some(cmd => cmd instanceof RegExp ? 
              cmd.test(command) :
              cmd === command
            ) :
            typeof plugin.command === 'string' ? 
              plugin.command === command :
              false

  			if (!isAccept) continue
        m.plugin = name
        let isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        let isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        let groupMetadata = m.isGroup ? await this.groupMetadata(m.chat) : {}
        let participants = m.isGroup ? groupMetadata.participants : []
        let user = m.isGroup ? participants.find(u => u.jid == m.sender) : {} 
        let bot = m.isGroup ? participants.find(u => u.jid == this.user.jid) : {} 
        let isAdmin = user.isAdmin || user.isSuperAdmin || false
        let isBotAdmin = bot.isAdmin || bot.isSuperAdmin || false 
        if (m.chat in global.DATABASE._data.chats) {
          let chat = global.DATABASE._data.chats[m.chat]
          if (name != 'unbanchat.js' && chat && chat.isBanned) return
          if (name != 'unbanuser.js' && user && user.banned) return
        }
        if (plugin.before && plugin.before({
          usedPrefix
        })) return
        let fail = plugin.fail || global.dfail 
        if (plugin.rowner && !isROwner) { 
          fail('rowner', m, this)
          continue
        }
        if (plugin.owner && !isOwner) { 
          fail('owner', m, this)
          continue
        }
        if (plugin.mods && !isMods) { 
          fail('mods', m, this)
          continue
        }
        if (plugin.premium && !isPrems) { 
          fail('premium', m, this)
          continue
        }
  			if (plugin.group && !m.isGroup) {
          fail('group', m, this)
          continue
        } else if (plugin.botAdmin && !isBotAdmin) { 
          fail('botAdmin', m, this)
          continue
        } else if (plugin.admin && !isAdmin) { 
          fail('admin', m, this)
          continue
        }
  			if (plugin.private && m.isGroup) { 
          fail('private', m, this)
          continue
        }
        if (plugin.register && user.registered == false) {
          fail('unreg', m, this)
          continue
        }

        m.isCommand = true
        let xp = 'exp' in plugin ? parseInt(plugin.exp) : 9 
        if (xp > 99) m.reply('Ngecit -_-') // Hehehe
        else m.exp += xp
        if (!isPrems && global.DATABASE._data.users[m.sender].limit < m.limit * 1 && plugin.limit) {
          this.reply(m.chat, `:V`, m)
          continue // Limit habis
        }
        try {        
          await plugin.call(this, m, {
            usedPrefix,
            noPrefix,
            _args,
            args,
            command,
            text,
            conn: this,
            participants,
            groupMetadata,
            isROwner,
            isOwner,
            isAdmin,
            isBotAdmin,
            isPrems
          })
          if (!isPrems) m.limit = m.limit || plugin.limit || false
        } catch (e) {
          // Error occured
          m.error = e
          console.log(e)
          if (e) m.reply(util.format(e))
        } finally {
          if (m.limit) m.reply(+ m.limit + ' Limit terpakai, mangkane ojok nyepam isok ae" boros paketan')
        }
  			break
  		}
  	}
  } finally {
    //console.log(global.DATABASE._data.users[m.sender])
    let user, stats = global.DATABASE._data.stats
    if (m) {
      if (m.sender && (user = global.DATABASE._data.users[m.sender])) {
        user.exp += m.exp
        user.limit -= m.limit * 1
      }
      
      let stat
      if (m.plugin) {
        let now = + new Date
        if (m.plugin in stats) {
          stat = stats[m.plugin]
          if (!isNumber(stat.total)) stat.total = 1
          if (!isNumber(stat.success)) stat.success = m.error ? 0 : 1
          if (!isNumber(stat.last)) stat.last = now
          if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error ? 0 : now
        } else stat = stats[m.plugin] = {
          total: 1,
          success: m.error ? 0 : 1,
          last: now,
          lastSuccess: m.error ? 0 : now
        }
        stat.total += 1
        stat.last = now
        if (!m.error) {
          stat.success += 1
          stat.lastSuccess = now
        }
      }
    } 

 try {
      require('./lib/print')(m, this)
    } catch (e) {
      console.log(m, m.quoted, e)
    }
  }
}
 conn.welcome = '*_Hallo mbah @user!_*\nSelamat datang di *@subject!*\n_Jangan lupa baca deskripsi :)_'
  conn.bye = '*_Selamat tinggal mbah @user!_*\n_Semoga tenang dialam sana :(_'
conn.onAdd = async function ({ m, participants }) {
  let chat = global.DATABASE._data.chats[m.key.remoteJid]
  if (!chat.welcome) return
  for (let user of participants) {
    let pp = './src/avatar_contact.png'
    try {
      pp = await this.getProfilePicture(user)
    } catch (e) {
    } finally {
      let text = (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@user', '@' + user.split('@')[0]).replace('@subject', this.getName(m.key.remoteJid))
      this.sendFile(m.key.remoteJid, pp, 'pp.jpg', text, m, false, {
        contextInfo: {
          mentionedJid: [user]
        }
      })
    }
  }
}
conn.onLeave = async function  ({ m, participants }) {
  let chat = global.DATABASE._data.chats[m.key.remoteJid]
  if (!chat.welcome) return
  for (let user of participants) {
    if (this.user.jid == user) continue
    let pp = './src/avatar_contact.png'
    try {
      pp = await this.getProfilePicture(user)
    } catch (e) {
    } finally {
      let text = (chat.sBye || this.bye || conn.bye || 'Bye, @user!').replace('@user', '@' + user.split('@')[0])
      this.sendFile(m.key.remoteJid, pp, 'pp.jpg', text, m, false, {
        contextInfo: {
          mentionedJid: [user]
        }
      })
    }
  }
}

conn.onDelete = async function (m) {
  if (m.key.fromMe) return
  let chat = global.DATABASE._data.chats[m.key.remoteJid]
  if (!chat.delete) return
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

conn.on('message-new', conn.handler)
conn.on('message-delete', conn.onDelete)
conn.on('group-add', conn.onAdd)
conn.on('group-leave', conn.onLeave)
conn.on('error', conn.logger.error)
conn.on('close', () => {
  setTimeout(async () => {
    try {
      if (conn.state === 'close') {
        await conn.loadAuthInfo(authFile)
        await conn.connect()
        global.timestamp.connect = new Date
      }
    } catch (e) {
      conn.logger.error(e)
    }
  }, 5000)
})

global.dfail = (type, m, conn) => {
  let msg = {
    rowner: '_*Command Khusus ROwner SGDC-BOT*_',
    owner: '_*Command Khusus Owner SGDC-BOT*_',
    mods: '_*Command Khusus Moderator SGDC-BOT*_',
    premium: '*Command Premium!* _Hubungi Owner jika ingin jadi user premium_!',
    group: '_*Command Khusus Di Group!*_',
    private: '_*Command Khusus Di Chat Pribadi!*_',
    admin: '_Command ini hanya untuk *Admin* grup!_',
    botAdmin: '*SGDC-BOT* harus jadi *Admin* untuk menggunakan Command ini!',
    //unreg: 'Silahkan daftar untuk menggunakan fitur ini dengan cara mengetik:\n\n*#daftar nama.umur*\n\nContoh: *#daftar Manusia.16*'
  }[type]
  if (msg) conn.reply(m.chat, msg, m)
}

if (opts['test']) {
  conn.user = {
    jid: '2219191@s.whatsapp.net',
    name: 'test',
    phone: {}
  }
  conn.chats
  conn.prepareMessageMedia = (buffer, mediaType, options = {}) => {
    return {
      [mediaType]: {
        url: '',
        mediaKey: '',
        mimetype: options.mimetype,
        fileEncSha256: '',
        fileSha256: '',
        fileLength: buffer.length,
        seconds: options.duration,
        fileName: options.filename || 'file',
        gifPlayback: options.mimetype == 'image/gif' || undefined,
        caption: options.caption,
        ptt: options.ptt
      }
    }
  }
  conn.sendMessage = async (chatId, content, type, opts = {}) => {
    let message = await conn.prepareMessageContent(content, type, opts)
    let waMessage = conn.prepareMessageFromContent(chatId, message, opts)
    if (type == 'conversation') waMessage.key.id = require('crypto').randomBytes(16).toString('hex').toUpperCase()
    conn.emit('message-new', waMessage)
  }
  rl.on('line', line => conn.sendMessage('123@s.whatsapp.net', line.trim(), 'conversation'))
} else {
  rl.on('line', line => {
    global.DATABASE.save()
    process.send(line.trim())
  })
  conn.connect().then(() => {
    global.timestamp.connect = new Date
  })
}
process.on('uncaughtException', console.error)
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

let pluginFolder = path.join(__dirname, 'plugins')
let pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
  try {
    global.plugins[filename] = require(path.join(pluginFolder, filename))
  } catch (e) {
    conn.logger.error(e)
    delete global.plugins[filename]
  }
}
console.log(Object.keys(global.plugins))
global.reload = (event, filename) => {
  if (pluginFilter(filename)) {
    let dir = path.join(pluginFolder, filename)
    if (dir in require.cache) {
      delete require.cache[dir]
      if (fs.existsSync(dir)) conn.logger.info(`re - require plugin '${filename}'`)
      else {
        conn.logger.warn(`deleted plugin '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`requiring new plugin '${filename}'`)
    let err = syntaxerror(fs.readFileSync(dir), filename)
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${err}`)
    else try {
      global.plugins[filename] = require(dir)
    } catch (e) {
      conn.logger.error(e)
    }
  }
}
Object.freeze(global.reload)
fs.watch(path.join(__dirname, 'plugins'), global.reload)

process.on('exit', () => global.DATABASE.save())



// Quick Test
let ffmpeg = spawnSync('ffmpeg')
let ffmpegWebp = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-'])
let convert = spawnSync('convert')
global.support = {
  ffmpeg: ffmpeg.status,
  ffmpegWebp: ffmpeg.status && ffmpegWebp.stderr.length == 0 && ffmpegWebp.stdout.length > 0,
  convert: convert.status
}
Object.freeze(global.support)


if (!global.support.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
if (!global.support.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--emable-ibwebp while compiling ffmpeg)')
if (!global.support.convert) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')