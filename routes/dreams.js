var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db =  mongojs('mongodb://jbellingham91:jesse1991@ds033126.mlab.com:33126/dreamcatcher', ['dream']);

/* GET all dreams */
router.get('/dream', function(req, res, next) {
    db.dream.find(function(err, dreams) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(dreams);
        }
    });
});

/* GET dream by id */

router.get('dream/:id', function(req, res, next) {
    db.dream.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, dream) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(dream);
        }
    });
});

/* GET dreams of user*/

router.get('dream/:userId', function(req, res, next) {
    db.dream.find({
        userId: mongojs.ObjectId(req.params.userId)
    }, function(err, dreams) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(dreams);
        }
    });
});

/* POST -- Create a new dream */

router.post('/dream', function(req, res, next) {
    var dream = req.body;

    if (!dream.text) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    }
    else {
        db.dream.save(dream, function(err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(result);
            }
        });
    }
});

/* PUT -- Update a dream */

router.put('/dream/:id', function(req, res, next) {
    var dream = req.body,
        updateObject = {};

    if (dream.name) {
        updateObject.name = dream.name;
    }
    if (dream.text) {
        updateObject.text = dream.text;
    }

    if (!updateObject) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    }
    else {
        db.dream.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updateObject, {}, function(err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(result);
            }
        });
    }
});

/* DELETE -- delete a dream */

router.delete('/dream/:id', function(req, res) {
    db.dream.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(result);
        }
    });
});

module.exports = router;