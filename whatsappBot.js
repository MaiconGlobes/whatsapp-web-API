var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//const qrcode = require('qrcode-terminal');
const qrcode = require('qrcode'); // O pacote correto � 'qrcode'
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth({ clientId: "maico-globes" })
});
let qrCodeBase64 = '';
let isBotReady = false;
client.on('qr', (qr) => __awaiter(this, void 0, void 0, function* () {
    try {
        // Converte para Base64 usando o pacote 'qrcode'
        qrCodeBase64 = yield qrcode.toDataURL(qr);
        // Garante que � um Base64 v�lido
        qrCodeBase64 = `data:image/png;base64,${qrCodeBase64.split(',')[1]}`;
    }
    catch (error) {
        console.error('Erro ao gerar o QR Code:', error);
    }
}));
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});
const delay = ms => new Promise(res => setTimeout(res, ms));
client.on('message_create', (msg) => __awaiter(this, void 0, void 0, function* () {
    if (msg.fromMe) {
        if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Ol�|ol�|ola|Ola|Algu�m ai?|Pode me ajudar?)/i) && msg.from.endsWith('@c.us')) {
            const chat = yield msg.getChat();
            yield delay(500); //delay de 3 segundos
            yield chat.sendStateTyping(); // Simulando Digita��o
            yield delay(500); //Delay de 1000 milisegundos mais conhecido como 3 segundos
            const contact = yield msg.getContact(); //Pegando o contato
            const name = contact.pushname; //Pegando o nome do contato
            yield client.sendMessage(msg.from, 'Ol�! ' + name.split(" ")[0] + 'Sou o assistente virtual da empresa tal. Como posso ajud�-lo hoje? Por favor, digite uma das op��es abaixo:\n\n1 - Como funciona\n2 - Valores dos planos\n3 - Benef�cios\n4 - Como aderir\n5 - Outras perguntas'); //Primeira mensagem de texto
        }
        if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
            const chat = yield msg.getChat();
            yield delay(500); //delay de 3 segundos
            yield chat.sendStateTyping(); // Simulando Digita��o
            yield delay(500);
            yield client.sendMessage(msg.from, 'Voc� selecionou a op��o 1');
        }
    }
}));
client.initialize();
module.exports = { client, isBotReady, getQrCode: () => qrCodeBase64 };
//# sourceMappingURL=whatsappBot.js.map