const WebSocket = require('ws')
 
const wss = new WebSocket.Server({ port: 8080 });
 
const Twitter = require('twitter');
const config = require('./config.js');
const T = new Twitter(config);

wss.on('connection', ws => {

const stream = T.stream('statuses/filter', {track: '#coding'});
stream.on('data', function(data) {
  //console.log(data);
  ws.send(JSON.stringify(data));
});
stream.on('error', function(error) {
  console.log(error);
});
});

const wss_topic = new WebSocket.Server({port : 8081});

wss_topic.on('connection', ws_t => {
    T.get('trends/place.json', {'id': 2295420}, function(err, data, response) {
      if(!err){
        console.log(data);
        ws_t.send(JSON.stringify(data));
      } else {
        console.log(error);
      }
    })
});
