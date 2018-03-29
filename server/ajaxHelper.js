var $ = require('jquery');

// url should be directed at a :user style endpoint
module.exports.get = (endpoint) => {
  console.log($.ajax);
  return new Promise(function(resolve, reject) {
    $.ajax({
      type: 'GET',
      url: endpoint,
      context: this,
      dataType: 'json',
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};
