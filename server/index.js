var express = require('express');
var bodyParser = require('body-parser');
var getCoordinatesFromInput = require('./geoHelper.js').getCoordinatesFromInput;
var dbUtil = require('../database/index.js');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
// var database = require('../database/index.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var hi = __dirname + '/../client/dist'
console.log('hi:', hi)
app.use(express.static(__dirname + '/../react-client/dist'));

//get sitter list
app.get('/sitters', function(req, res) {
  dbUtil.getSitters()
        .then(results => res.send(results))
        .catch(err => console.log(err));
})

//get reviews for one sitter
app.get('/reviews/:sitterID', function(req, res) {
  dbUtil.getSitterReviews(req.params.sitterID)
        .then(results => res.send(results))
        .catch(err => console.log(err));
})


app.get('/owner/:ownerID', function(req, res) {
  dbUtil.getOwner(req.params.ownerID)
        .then(results => res.send(results))
        .catch(err => res.send(null));
})

app.get('/owner/sitterdetail/:id', function(req, res) {
  var id = req.params.id;
  dbUtil.getSitterDetail(id)
    .then((result) => {
      res.send(result);
    })
})

app.get('/owner/dashboard/:id', function(req, res) {
  var id = req.params.id;
  dbUtil.getOwnerDashboard(id)
    .then((result) =>
      res.send(result[0])
    );
})

app.post('/owner/sendtask', function(req, res) {
  var options = req.body;
  dbUtil.createTask(options)
    .then((result) => {
    res.status(201).send('ok');
  });
});

app.post('/ownerprofile/create', function(req, res) {
  var options = req.body;
  dbUtil.insertOwnerProfile(options)
    .then((result) => {
    res.status(201).send('ok');
  });
});

app.post('/ownerprofile/UPDATE', function(req, res) {
  var options = req.body;
  dbUtil.updateOwnerProfile(options)
    .then((result) => {
    res.status(201).send('update');
  });
});


app.post('/task/cancel', function(req, res) {
  var options = req.body;
  dbUtil.cancelTask(options.id)
    .then((result) => {
    res.status(201).send('cancel');
  })
});

app.post('/task/reject', function(req, res) {
  var options = req.body;
  dbUtil.rejectTask(options.id)
    .then((result) => {
    res.status(201).send('cancel');
  })
});

app.post('/task/confirm', upload.single('avatar'), function(req, res) {
  var options = req.body;
  dbUtil.confirmTask(options.id)
    .then((result) => {
    res.status(201).send('confirm');
  });
});

app.post('/task/summit', upload.single('avatar'), function(req, res) {
  var options = req.body;
  dbUtil.summitReview(options)
    .then((result) => {
    res.status(201).send('summit');
  });
});

app.listen(3000, function() {
  console.log('Server started and listening on port 3000!!!!!');
});

//**now working right now
app.post('/owner/image',upload.single('avatar'), function(req, res) {
  console.log('its a file from user uploaded for owners image',req.file)
})


//**following endpoints are made for sitter part,interaction between server and db , no front end
//**use POSTMAN to send http Request

app.get('/sitter/dashboard/:id', function(req, res) {
  var id = req.params.id;
  dbUtil.getSitterDashboard(id)
    .then((result) => {
      console.log('dashboard result:',result);
      res.send(result[0]);
    }
  );
})

app.post('/sitter/accepttask', function(req, res) {
  var options = req.body;
  dbUtil.acceptTask(options)
  .then((result) => {
    res.status(201).send('accept');
  });
});

//**now working right now
//when insert new sitter profile, convert address into geo location
app.post('/sitterprofile/create', (req, res) => {
  var address = req.body.address;
  getCoordinatesFromInput(address)
    .then(coords => {
      req.body.latitude = coords[0];
      req.body.longitude = coords[1];
    })
    .then((result) => {
      dbUtil.insertSitterProfile(req.body)
    })
    .then(results => res.send())
    .catch(err => console.log(err));
})
