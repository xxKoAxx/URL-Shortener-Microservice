const mongoose = require('mongoose')

const Schema = new mongoose.Schema({ 
    url: String,
    shorturl: Number
}, {
    versionKey: false,
    timestamps: true,
})

// schema for counter (created initially in database)
var CounterSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counter = mongoose.connection.useDb('URL_Shortener_Microservice').model('counter', CounterSchema);

// pre-hook (run before save called)
Schema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'counterId'}, {$inc: { seq: 1} }, {new: true, upsert: true, returnDocument: 'after'})
        .then(data => {
            doc.shorturl = data.seq
            next()
        })
});

// export model (connected to Db)
module.exports = mongoose.connection.useDb('URL_Shortener_Microservice').model('shorturl', Schema)
