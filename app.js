var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var twilio = require('twilio');

var client = new twilio.RestClient(process.env.TWILIO_SID,
                                   process.env.TWILIO_AUTH);
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

var conns = [];

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

io.on('connection', function (socket) {
  console.log('a user connected');
});

app.post('/text', urlencodedParser, function (req, res) {
  io.emit('txt', req.body);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
