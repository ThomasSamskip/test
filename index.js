var express = require('express'),
    serveStatic = require('serve-static'),
    open = require('open'),
    app = express();

app.use('/resources', express.static(__dirname + '/resources'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use("/main", function(req, res){
  console.log('loading dashboard');
  res.sendFile(__dirname+"/main.html");
});

app.use(express.static(__dirname));

app.listen(8000, function(){
  console.log('listening on port 8000');
  open('http://localhost:8000');
});
