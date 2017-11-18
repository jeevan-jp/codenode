const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, (err, db) => {
    assert.equal(err, null);

    console.log('Connected correctly to the server...');

    dboper.insertDocument(db, { "name": "Vadonut", "description": "test" }, "dishes", (result) => {
        console.log("Inserted Document: \n" + result.ops);

        dboper.findDocument(db, "dishes", (docs) => {
            console.log("Found Documents: \n" + docs );

            dboper.updateDocument(db, {"name": "vadonut" }, { "description": "updated test" }, "dishes", (result) => {
                console.log("Updated document: \n" + result.result );
                
                dboper.findDocument(db, "dishes", (docs) => {
                    console.log('Found Document: \n' + docs);

                    db.dropCollection("dishes", (result) => {
                        console.log('Dropped Collection: ' + result );

                        db.close();
                    });
                });
            });
        });
    });
});