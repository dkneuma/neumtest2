var express = require('express');
var router = express.Router();

/*
 * GET songlist.
 */
router.get('/songlist', function(req, res) {
    var db = req.db;
    db.collection('songlist').find().toArray(function (err, items) {
        res.json(items);
    });
});
module.exports = router;
