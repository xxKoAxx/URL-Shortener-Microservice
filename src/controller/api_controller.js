const dbModel = require('../config/database/dbSchema')
const dns = require('dns')
const mongoose = require('mongoose')

class apiController{

    // [GET] /api/shorturl
    saveNewShortUrl(req, res){
        if (!/https*:/.test(req.body.url)) return res.json({ error: 'invalid url' })

        dns.lookup(req.body.url, (err, address, family) =>{
            if (err) res.json({ error: 'invalid url' })
            else{
                let newUrl = new dbModel({
                    url: req.body.url,
                    // shorturl: 1
                })
                newUrl.save()
                    .then(data => {
                        res.json({
                            original_url: data.url,
                            short_url: data.shorturl
                        })
                    })
                    .catch(err => console.log(err))
            }

        })     
    }

    //[GET] /api/shorturl/:shorturl
    getWebFromShortUrl(req, res){
        dbModel.findOne({shorturl: Number(req.params.shorturl)})
            .then(data => { 
                if (data === null ){
                    res.json({ error: 'cannot find data'})
                } 
                else{
                    res.redirect(data.url)
                }
                // res.json(data)

            })
            .catch(err => {
                res.json({ error: err})
                console.log(err)
            })
    }

    //[GET] /api/Hello
    greeting (req, res) {
        res.json({greeting: 'hello API'});
    }

}


module.exports = new apiController();