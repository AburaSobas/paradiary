var mongodb = require('mongodb');
var server = new mongodb.Server('localhost',27017);
var db = new mongodb.Db('sampledb', server, {safe: true});
db.open(function (err, db) {
    if (err) {
        throw err;
    }
    var collection = db.collection('dairy');
    var diary = {
        title: '眠い',
        postBy: 'skip'
    };
    collection.insert(diary, function (err, result) {
        if (err) {
            throw err;
        }
        console.log('insert success');
    });
    return;
});
