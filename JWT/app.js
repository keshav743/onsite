const express = require("express");
const jwt = require("jsonwebtoken");
const parser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');
app.use(parser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.write("API WORKING.\n\n");
    res.write("Make get requests to this route with your own username passsword and secret at u,p,s respectively.\n\n");
    res.write("URL- /api/{u}&{p}&{s}\n\n");
    res.write("To retrieve your token. paste your token in the place of jwt in the below mentioned URL\n\n");
    res.write("URL - /api/{jwt}\n\n");
    res.write("To verify your token and to modify paste your token in the place of jwt in the below mentioned URL\n\n");
    res.write("URL - /verify/{jwt}\n\n");
    res.send();
});

var secret = "";

app.get("/api/:username&:password&:secret",function(req,res){
    const user = {
        username: req.params.username,
        password: req.params.password,
        secret: req.params.secret
    };
    secret = req.params.secret;
    const newToken = jwt.sign({user: user}, "secret", (err,token) => {
        res.json({
            token: token
        });
    });
})

app.get("/api/:jwt",function(req,res){
    jwt.verify(req.params.jwt, secret ,function(err,result){
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                mySecret: "secret unfolded",
                data: result
            });
        }
    });
    
})

app.get("/verify/:jwt",function(req,res){
    var parts = req.params.jwt.split(".");
    res.render("verify",{opt: parts[0], data: parts[1], key: parts[2]});
});

app.post("/verify",function(req,res){
    var jwtnew = req.body.options+"."+req.body.userData+"."+req.body.secretKey;
    res.redirect("/api/"+jwtnew);
});

app.listen(3000,function(){
    console.log("Server Started on port 3000.");
})