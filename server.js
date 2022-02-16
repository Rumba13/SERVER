const { Telegraf, Markup } = require('telegraf')

require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN)
var serverName = 'ЦК КПСС'
bot.start((ctx) => ctx.reply('Я т11888ебе помогать не обязан'))
bot.help((ctx) => ctx.reply('Я т11ебе помогать не обязан'))
bot.on('sticker', (ctx) => ctx.reply('👍'))


// bot.hears('ставь', (ctx) => {
// 	setInterval(() => {
// 		ctx.reply('💩💩💩 Я обосрался 💩💩💩')
// 	}, 1000);
// })

var ctxtop = null;

bot.hears('C', (ctx) => {
	ctxtop = ctx;
	ctxtop.reply('КОНТЕКСТ УТВЕРЖДЁН, ОЖИДАЮ WEBSOCKET')
})


bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))





var i = 0
let t = true;
const http = require('http');
const fs = require('fs');
const ws = new require('ws');

const wss = new ws.Server({ noServer: true });

const clients = new Set();

function accept(req, res) {

	if (req.url == '/ws' && req.headers.upgrade &&
		req.headers.upgrade.toLowerCase() == 'websocket' &&
		// может быть подключён: keep-alive, Upgrade
		req.headers.connection.match(/\bupgrade\b/i)) {
		wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
	} else if (req.url == '/') { // index.html
		fs.createReadStream('./index.html').pipe(res);
	} else { // страница не найдена
		res.writeHead(404);
		res.end();
	}
}

function wait(time = TIME_OUT) {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(wait), time);
	})
}

function onSocketConnect(ws) {
	clients.add(ws);

	for (let client of clients) {
		log(`новое подключение`);

		ws.on('message', function (message) {

			try {
				if (t) {
					t = false
					client.send(serverName + ': ' + '<br> Соединение стоит как при виагре')
					ctxtop.reply('КОНТЕКСТ ЗАХВАЧЕН, WEBSOCKET УСТАНОВЛЕН, ')
				}
			}
			catch (err) {
				ws.send(serverName + ': ' + '<br> ERR! <br>КОНТЕКСТ - ОТСУТСТВУЕТ')

			}
			try {
				message = JSON.parse(message)
				client.send(serverName + ': ' + '<br> Вроде JSON, надеюсь, там хентай.')
			}
			catch (err) {
				client.send(serverName + ': ' + '<br> Так, Ты мне вроде строку отправил...')
			}

			log(typeof message)
			if (Array.isArray(message)) {
				log('parse...' + i)
				reply(5 + i)
				function reply(c) {

					wait(1000).then(() => {
						var url = message[i];
						console.log(i);
						try {

							ctxtop.replyWithPhoto(url)
						} catch (err) {

						}
						i++

						if (i < c) reply(c)
					})
				}
			}
			else {
				client.send(serverName + ': ' + '11')
			}



		});

		ws.on('close', function () {
			log(`подключение закрыто`);
			client.send(serverName + ': ' + 'Закрыто')
			clients.delete(ws);
		});
		ws.on('open', function () {
			client.send(serverName + ': ' + 'Вижу тебя брат')
		})
	}

}

let log;
if (!module.parent) {
	log = console.log;
	http.createServer(accept).listen(8080);
} else {
	log = function () { };
	exports.accept = accept;
}