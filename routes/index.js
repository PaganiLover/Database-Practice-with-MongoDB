var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var Customer = require('../models/customersSchema.js');
var Salesmen = require('../models/SalesmenSchema.js');
var NewEvent = require('../models/EventSchema.js');
var Inventory = require('../models/InventorySchema.js');
var Locations = require('../models/LocationSchema.js');

var url = "mongodb://localhost:27017/project";

router.post('/CustomerAddition', function(req, res, next) {
  var item = {
    Firstname: req.body.Fname,
    Lastname: req.body.Lname,
    phone: req.body.phone,
    email: req.body.email
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('customers').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('item inserted');
      db.close();
      res.redirect('/CustomerAddition');
    });
  });
});

router.post('/inventoryAddition', function(req, res, next) {
  var item = {
    Make: req.body.Make,
    Model: req.body.Model,
    Year: req.body.Year,
    Price: req.body.Price
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('inventories').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('item inserted');
      db.close();
      res.redirect('/inventoryAddition');
    });
  });
});

router.post('/locationAddition', function(req, res, next) {
  var item = {
    State: req.body.State,
    City: req.body.City,
    Zip: req.body.Zip,
    Full: req.body.Full
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('locations').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('item inserted');
      db.close();
      res.redirect('/locationAddition');
    });
  });
});

router.post('/salesmenAddition', function(req, res, next) {
  var item = {
    Firstname: req.body.Fname,
    Lastname: req.body.Lname,
    Experience: req.body.experience,
    email: req.body.email
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('employees').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('item inserted');
      db.close();
      res.redirect('/salesmenAddition');
    });
  });
});

router.post('/eventAddition', function(req, res, next) {
  var item = {
    EventName: req.body.Ename,
    EventDate: req.body.Edate,
    EventTime: req.body.Etime,
    EventPrice: req.body.Eprice
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('events').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('item inserted');
      db.close();
      res.redirect('/eventAddition');
    });
  });
});


//router rendering and logic

router.get('/',function(req,res){
  res.render('home', {title: 'Home'});
});

router.get('/customers',function(req,res){
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('customers').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('customers', {items: resultArray});
    });
  });
});

router.post('/delete', function(req, res, next) {
  var id = req.body.spoof;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('customers').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('item deleted');
      db.close();
    });
    res.redirect('customers');
  });
});

router.get('/updatePage', function(req, res, next) {
  var id = req.query.identification;
  console.log(id + ' this is the get route');

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('customers').findOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      res.render('customerUpdate', {items: result});
      console.log('item updated');
      db.close();
    });
  });
})

router.post('/commit', function(req, res, next) {
  var id = req.body.identification;

   var item = {
     Firstname: req.body.Fname,
     Lastname: req.body.Lname,
     phone: req.body.phone,
     email: req.body.email
   };

   mongo.connect(url, function(err, db) {
     assert.equal(null, err);
     db.collection('customers').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
       assert.equal(null, err);
       res.render('customerUpdate', {items: result});
       console.log('item updated');
       db.close();
     });
   });

  //res.redirect('http://localhost:3000/customers');
});

router.post('/query', function(req, res, next) {
  var queryInput = req.body.query;
  console.log(queryInput);

  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('customers').find({"Firstname": queryInput});
    cursor.forEach(function(result, err) {
      assert.equal(null, err);
      resultArray.push(result);
    }, function() {
      db.close();
      res.render('customerQuery', {name: resultArray});
    });
  });
});



router.get('/inventory',function(req,res){
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('inventories').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('inventory', {items: resultArray});
    });
  });
});

router.post('/inventorydelete', function(req, res, next) {
  var id = req.body.spoof;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('inventories').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('item deleted');
      db.close();
    });
    res.redirect('inventory');
  });
});

router.get('/inventoryupdatePage', function(req, res, next) {
  var id = req.query.identification;
  console.log(id + ' this is the get route');

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('inventories').findOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      res.render('inventoryUpdate', {items: result});
      db.close();
    });
  });
})

router.post('/inventorycommit', function(req, res, next) {
  var id = req.body.identification;

   var item = {
     Make: req.body.Make,
     Model: req.body.Model,
     Year: req.body.Year,
     Price: req.body.Price
   };

   mongo.connect(url, function(err, db) {
     assert.equal(null, err);
     db.collection('inventories').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
       assert.equal(null, err);
       res.render('inventoryUpdate', {items: result});
       console.log('item updated');
       db.close();
     });
   });
});

router.post('/inventoryquery', function(req, res, next) {
  var queryInput = req.body.query;
  console.log(queryInput);

  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('inventories').find({"Make": queryInput});
    cursor.forEach(function(result, err) {
      assert.equal(null, err);
      resultArray.push(result);
    }, function() {
      db.close();
      res.render('inventoryQuery', {make: resultArray});
    });
  });
});



router.get('/locations',function(req,res){
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('locations').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('locations', {items: resultArray});
    });
  });
});

router.post('/locationdelete', function(req, res, next) {
  var id = req.body.spoof;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('locations').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('item deleted');
      db.close();
    });
    res.redirect('locations');
  });
});

router.get('/locationupdatePage', function(req, res, next) {
  var id = req.query.identification;
  console.log(id + ' this is the get route');

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('locations').findOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      res.render('locationUpdate', {items: result});
      console.log('item updated');
      db.close();
    });
  });
})

router.post('/locationcommit', function(req, res, next) {
  var id = req.body.identification;

   var item = {
     State: req.body.State,
     City: req.body.City,
     Zip: req.body.Zip,
     Full: req.body.Full
   };

   mongo.connect(url, function(err, db) {
     assert.equal(null, err);
     db.collection('locations').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
       assert.equal(null, err);
       res.render('locationUpdate', {items: result});
       console.log('item updated');
       db.close();
     });
   });
});

router.post('/locationquery', function(req, res, next) {
  var queryInput = req.body.query;
  console.log(queryInput);

  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('locations').find({"State": queryInput});
    cursor.forEach(function(result, err) {
      assert.equal(null, err);
      resultArray.push(result);
    }, function() {
      db.close();
      res.render('locationQuery', {state: resultArray});
    });
  });
});



router.get('/salesmen',function(req,res){
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('employees').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('salesmen', {items: resultArray});
    });
  });
});

router.post('/salesmendelete', function(req, res, next) {
  var id = req.body.spoof;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('employees').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('item deleted');
      db.close();
    });
    res.redirect('salesmen');
  });
});

router.get('/salesmenupdatePage', function(req, res, next) {
  var id = req.query.identification;
  console.log(id + ' this is the get route');

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('employees').findOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      res.render('salesmenUpdate', {items: result});
      console.log('item updated');
      db.close();
    });
  });
})

router.post('/salescommit', function(req, res, next) {
  var id = req.body.identification;

   var item = {
     Firstname: req.body.Fname,
     Lastname: req.body.Lname,
     Experience: req.body.Experience,
     email: req.body.email
   };

   mongo.connect(url, function(err, db) {
     assert.equal(null, err);
     db.collection('employees').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
       assert.equal(null, err);
       res.render('salesmenUpdate', {items: result});
       console.log('item updated');
       db.close();
     });
   });
});

router.post('/salesmenquery', function(req, res, next) {
  var queryInput = req.body.query;
  console.log(queryInput);

  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('employees').find({"Firstname": queryInput});
    cursor.forEach(function(result, err) {
      assert.equal(null, err);
      resultArray.push(result);
    }, function() {
      db.close();
      res.render('salesmenQuery', {name: resultArray});
    });
  });
});



router.get('/events',function(req,res){
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('events').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('events', {items: resultArray});
    });
  });
});

router.post('/eventsdelete', function(req, res, next) {
  var id = req.body.spoof;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('events').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('item deleted');
      db.close();
    });
    res.redirect('events');
  });
});

router.get('/eventupdatePage', function(req, res, next) {
  var id = req.query.identification;
  console.log(id + ' this is the get route');

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('events').findOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      res.render('eventUpdate', {items: result});
      console.log('item updated');
      db.close();
    });
  });
})

router.post('/eventcommit', function(req, res, next) {
  var id = req.body.identification;

   var item = {
     EventName: req.body.Ename,
     EventDate: req.body.Edate,
     EventTime: req.body.Etime,
     EventPrice: req.body.Eprice
   };

   mongo.connect(url, function(err, db) {
     assert.equal(null, err);
     db.collection('events').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
       assert.equal(null, err);
       res.render('eventUpdate', {items: result});
       console.log('item updated');
       db.close();
     });
   });
});

router.post('/eventquery', function(req, res, next) {
  var queryInput = req.body.query;
  console.log(queryInput);

  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('events').find({"EventName": queryInput});
    cursor.forEach(function(result, err) {
      assert.equal(null, err);
      resultArray.push(result);
    }, function() {
      db.close();
      res.render('eventQuery', {EventName: resultArray});
    });
  });
});

router.get('/CustomerAddition',function(req,res){
  res.render('addCustomer', {title: 'customer addition'});
});

router.get('/eventAddition',function(req,res){
  res.render('addEvents', {title: 'add event'});
});

router.get('/locationAddition',function(req,res){
  res.render('addLocations', {title: 'add location'});
});

router.get('/salesmenAddition',function(req,res){
  res.render('addSalesmen', {title: 'add salesman'});
});

router.get('/inventoryAddition',function(req,res){
  res.render('addInventory', {title: 'add inventory'});
});

router.get('/QuickAdd',function(req,res){
  res.render('quickAdd', {title: 'quick add'});
});

router.get('/query', function(req, res, next) {
  return res.render('customerQuery', {title: 'Query'});
});

router.get('/locationquery', function(req, res, next) {
  return res.render('locationQuery', {title: 'Query'});
});

router.get('/eventquery', function(req, res, next) {
  return res.render('eventQuery', {title: 'Query'});
});

router.get('/inventoryquery', function(req, res, next) {
  return res.render('inventoryQuery', {title: 'Query'});
});

router.get('/salesmenquery', function(req, res, next) {
  return res.render('salesmenQuery', {title: 'Query'});
});


module.exports = router;
