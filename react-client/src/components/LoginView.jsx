import React from  'react';
import {get} from '../ajaxHelper.js';

class Login extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    var context = this;
    window.fbAsyncInit = function() {
      FB.init({
        appId            : '273686389806415',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.10'
      });

      window.FB.getLoginStatus(function(response){
        context.props.setAuth(response);
        if(response.status === 'connected'){
          get('/owner/' + response.authResponse.userID)
            .then(user => context.props.setUser(user))
            .catch(err => console.log('login', err));
        }else if(response === 'not_authorized'){
          console.log('not autorized')
        }else{
          console.log('not logged in');
        }
      }, true)

      FB.Event.subscribe('auth.login', (response) => {
        get('/owner/' + response.authResponse.userID)
        .then(user => context.props.setUser(user))
        .catch(err => console.log(err));
        context.props.setAuth(response);
      });

      FB.Event.subscribe('auth.logout', (response) => {
        context.props.setAuth(response);
        context.props.setUser(null);
      });
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }


  render() {
    return (
      <div className="fb-login-button" data-width="50" data-max-rows="1" data-size="large"
           data-button-type="continue_with" data-show-faces="false"
           data-auto-logout-link="true" data-use-continue-as="false">
      </div>
    );
  }
}

//thery.
export  default Login
