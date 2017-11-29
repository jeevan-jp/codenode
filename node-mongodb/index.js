const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url).then((db) => {
    console.log('Connected correctly to the server...');

    dboper.insertDocument(db, { "name": "Vadonut", "description": "test" }, "dishes")
    .then((result) => {
        console.log("Inserted Document: \n" + JSON.stringify(result.ops));

        return dboper.findDocument(db, "dishes");
    })
    .then((docs) => {
        console.log("Found Documents: \n" + JSON.stringify(docs) );

        return dboper.updateDocument(db, {"name": "vadonut" }, { "description": "updated test" }, "dishes")
    })
    .then((result) => {
        console.log("Updated document: \n" + JSON.stringify(result.result) );
                
        return dboper.findDocument(db, "dishes");
    })
    .then((docs) => {
        console.log('Found Document: \n' + JSON.stringify(docs));

        return db.dropCollection("dishes")
    })
    .then((result) => {
        console.log('Dropped Collection: ' + JSON.stringify(result) );

        return db.close();
    })
    .catch((err) => console.log(err));
}, (err) => console.log(err))
.catch((err) => console.log(err));
