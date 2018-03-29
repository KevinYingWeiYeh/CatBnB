import $ from 'jquery';

// url should be directed at a :user style endpoint
export const get = (endpoint) => {
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

export const post = (endpoint, data) => {
  return new Promise(function(resolve, reject) {
    $.ajax({
      type: 'POST',
      url: endpoint,
      context: this,
      contentType: 'application/json',
      data: data
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};

// url should be directed at a :user style endpoint
export const patch = (endpoint, data) => {
  return new Promise(function(resolve, reject) {
    $.ajax({
      type: 'PATCH',
      url: endpoint,
      context: this,
      contentType: 'application/json',
      data: data
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};
