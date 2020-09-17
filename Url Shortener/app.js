const express = require("express");
const ejs = require("ejs");
const parser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(parser.urlencoded());

mongoose.connect('mongodb://localhost:27017/urlDB', {useNewUrlParser: true, useUnifiedTopology: true});

const urlSchema = mongoose.Schema({
    fullURL: String,
    shortURL: String,
});

const url = mongoose.model('url', urlSchema);

app.get("/",function(req,res){
    url.find({},function(err,result){
        if(err){
            console.log(err);
            res.send("something went wrong.");
        }else{
            if(result){
                console.log(result);
                res.render("url",{data: result});
            }
        }
    });
})

app.post("/",function(req,res){
    console.log(req.body.fullURL);
    if(req.body.fullURL != "" || req.body.fullURL != " "){
        var shortURLPart = shortURL(6);
        url.find({shortURL: "http://localhost:3000/urls/"+shortURLPart},function(err,result){
            if(err){
                console.log(err);
            }else{
                if(result.length == 0){
                    const newURL = new url({
                        fullURL: req.body.fullURL,
                        shortURL: "http://localhost:3000/urls/"+shortURLPart
                    });
                    newURL.save();
                    res.redirect("/");
                }else{
                    var t = true;
                    while(t){
                        shortURLPart == shortURL(6);
                        url.find({shortURL: "http://localhost:3000/urls"+shortURLPart},function(err,url){
                            if(err){
                                console.log(err);
                            }else{
                                if(result.length == 0){
                                    const newURL = new url({
                                        fullURL: req.body.fullURL,
                                        shortURL: "http://localhost:3000/urls/"+shortURLPart
                                    });
                                    newURL.save();
                                    t = false;
                                    res.redirect("/");
                                }else{
                                    console.log("Try Again");
                                }
                            }
                        });
                    }
                }
            }
        })

    }
})

function shortURL(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

app.get("/urls/:url",function(req,res){
    url.find({shortURL: "http://localhost:3000/urls/"+req.params.url},function(err,result){
        if(err){
            console.log(err);
        }else{
            if(result.length == 0){
                console.log("No Urls Found");
            }else{
                res.send('<a href="'+ result[0].fullURL +'">click here to redirect to your website</a>');
            }
        }
    })
});

app.listen(3000, function(){
    console.log("Server Started on port 3000.");
})