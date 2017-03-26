var express = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var upload = multer({dest: './uploads/'});
var app = express();

var port = process.env.PORT||8080;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/',function(req,res){
   res.render('index',{size:''}); 
});

app.post('/',upload.single('ourFile'),function(req,res){
   res.render('index',{size:'Your file ' + req.file.originalname +' is ' + req.file.size + ' bytes heavy.'});
   fs.unlink(req.file.path,function(err){
       if(err) return console.error(err);
       console.log('Removed files.');
   });
});

app.listen(port,function(err){
    if(err) return console.error(err);
    console.log('App running');
})