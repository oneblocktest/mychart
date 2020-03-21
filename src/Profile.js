import React, { Component } from 'react';
import { Person} from 'blockstack';
import Appok from './App/Appok.js';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';
export const ME_FILENAME = 'mychart.json'


export default class Profile extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  person: {
  	  	name() {
          return 'Anonymous';
        }/* ,
  	  	avatarUrl() {
  	  	  return avatarFallbackImage;
  	  	}, */
  	  },
  	};
  }

  render() {
    const { handleSignOut, userSession } = this.props;
    const { person } = this.state;
    console.log(person)
    return (
      !userSession.isSignInPending() ?
      <div className="panel-welcome" id="section-2">
        <div className="avatar-section">
         <img src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage } className="img-rounded avatar" id="avatar-image"   alt=""/>
        </div>
        <h1> <span id="heading-name">{ person.name() ? person.name() : 'Nameless Person' }</span>的隐私图表</h1>
     
        <Appok userSession={userSession} />
        <p className="lead">
      
          <button
            className="btn btn-primary btn-lg"
            id="signout-button"
            onClick={ handleSignOut.bind(this) }
          >
            Logout
          </button>
        </p>
      </div> : null
    );
  }

  componentWillMount() {
    const { userSession } = this.props;
    this.setState({
      person: new Person(userSession.loadUserData().profile),
    });
  }

 
}


//width:30% height:30%
