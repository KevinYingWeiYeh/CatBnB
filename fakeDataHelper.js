var fs = require('fs');
var db = require('./database/index.js');

var fakeNameList = ['Donald', 'Duck', 'Steve', 'Tim', 'Kanye', 'Jerry', 'Victor', 'Andrew', 'Umi', 'Kevin', 'Steven', 'Steve', 'Ken', 'Clark', 'Angel', 'Kate', 'Rowena', 'Zooey', 'Mara'];
var fakeReviewList = ['I was in need of a new pet sitter for my 2 kitties and fortunately Vanessa was available! She took great care of my cats, provided updates after each visit, and even left a cat toy. Vanessa is reliable, responsive, and loves animals!',
                      'Amazing! Will come back! This is the sitter you are looking for!',
                      "I cannot believe how well my cat was taken care of, grumpy cat isn't grumpy anymore!",
                      'Um, I guess he was alright.'];
var sitters = 'INSERT INTO sitterProfile (id, fb_userId, name, photo, description, comeIn, boarding, price, unit, createdAt, phone, email, address, zipcode, latitude, longitude, rating) VALUES \n';
var reviews = 'INSERT INTO reviews (review, owner_id, sitter_id, task_id, rating) VALUES \n';
var fakeSitters = [];
var fakeReviews = [];
var randomTo = function(n) {
  return Math.floor(Math.random() * n);
}

for (var i = 10; i < 510; i++) {
  var sitter_id = i;
  var fb_userId = randomTo(10000);
  var name = fakeNameList[randomTo(fakeNameList.length)];
  var photo = '00'+ Math.ceil(Math.random() * 9) + '.jpeg';
  var price = randomTo(100);
  var address = randomTo(1000) + '' + name + ' st';
  var latitude = (Math.random() * 0.059512) + 37.747929
  var longitude = -1 * ((Math.random() * 0.126362) + 122.387327);
  var rating = randomTo(11);
  var sitter = `(${sitter_id}, '${fb_userId}','${name}','${photo}','awesome', 0, 1, ${price}, 'day', '2017-10-04', '0000000000','${name}@gmail.com','${address}','94102', ${latitude}, ${longitude}, ${rating})`

  for (var j = 0; j < randomTo(10); j++) {
    var message = fakeReviewList[randomTo(fakeReviewList.length)];
    var review = `("${message}", 1, ${sitter_id}, 3, 8)`;
    fakeReviews.push(review);
  }
  fakeSitters.push(sitter);
}


sitters += fakeSitters.join(',\n') + ';';
reviews += fakeReviews.join(',\n') + ';';

fs.appendFile('./catbnb.sql', sitters + '\n\n' + reviews, function(err) {
  if (err) console.log(err);
  console.log('test data appended');
})
