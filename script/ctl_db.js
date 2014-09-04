var mongodb = require('mongodb')
var server = new mongodb.Server('localhost', 27017);
var db = new mongodb('paradiarydb', server, {safe: true});

db.open(function (err, db) {
    if (err) {
        throw err;
    }
});


var collection = db.collection('diary_item');

function insertDiary(_date, _contents){
    var new_diary = {
        diary_date; _date,
        diary_contents: _contents
    };
    collection.insert(new_diary, function (err, result) {
        if (err) {
            throw err;
        }
        console.log(result);
    });
}