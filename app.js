"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const index_1 = require("./routes/index");
const user_1 = require("./routes/user");
const whatsappBot = require('./whatsappBot');
const { client, isBotReady, getQrCode } = whatsappBot;
const debug = require('debug')('my express app');
const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index_1.default);
app.use('/users', user_1.default);
// Configurando a rota para exibir o QR Code
app.get('/qr', (req, res) => {
    const qrCode = getQrCode(); // Obt�m o QR Code gerado
    if (qrCode) {
        res.send(`<img src="${qrCode}" alt="QR Code">`); // Exibe o QR Code na p�gina
    }
    else {
        res.send('Aguardando QR Code... Atualize a p�gina.');
    }
});
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), function () {
    debug(`Express server rodando na porta ${server.address().port}`);
});
//# sourceMappingURL=app.js.map