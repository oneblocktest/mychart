import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Table from './Table.js';
//import { render } from '@testing-library/react';
import Form from './Form.js';
import { AppConfig } from 'blockstack'
//import { UserSession } from 'blockstack'
//import { Table } from 'react-bootstrap';


export const appConfig = new AppConfig(['store_write', 'publish_data'])

export const ME_FILENAME = 'mychart.json'
export const SUBJECTS_FILENAME = 'subjects.json'

class Appok extends Component {
  constructor(props) {
    super(props);
  };

  state = {
    characters: [],
    pricedata: [],
    savingMe: false,
    // savingKingdown: false,
    redirectToMe: false,
    mydata: []

  };


  handleSubmit = character => {
    character.price = this.state.pricedata[character.coin].usd
    character.valuedata = character.price * character.value
    this.setState({ characters: [...this.state.characters, character] });
   // this.getmydata()
  }
  removeCharacter = index => {
    const { characters } = this.state

    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index
      }),
    })
  }

  render() {
    //const { userSession } = this.props;

    const { characters } = this.state;
    return (
      <div className="container-fluid">
        <div className="row-fluid">
          <div className="col-md-12">
            <h1>this is your Privacy chart </h1>
            <p>Add your table.</p>

            <div className="row-fluid">
              <div className="col-md-6">
                <div className="table-responsive" >
                  <Table
                    characterData={characters}
                    removeCharacter={this.removeCharacter}
                  />
                </div>
              </div>
            </div>
            <div className="row-fluid">
              <div className="col-md-6" >
              </div>
              <div className="col-md-12">
                <h3>Add New</h3>

                <div className="form-group">
                  <Form handleSubmit={this.handleSubmit} />
                </div>
                <div>
            {/*       <button
                    className="btn btn-primary btn-lg"
                    id="saveme"
                    onClick={this.saveMe(this.state.mydata)}
                  >
                    saveme
          </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );


  }


  componentWillMount() {
    this.getpirce();
  //  this.loadMe();

  }

  getpirce() {
    const coins = [
      "bitcoin",
      "eos",
      "cosmos",
      "blockstack",
      "bitcoin-cash",
      "ethereum",
      "ethereum-classic",
      "monero",
      "dash",
      "beam",
      "grin",
      "steem",
      "algorand",
      "zcash",
      "ontology",
      "super-zero"
    ];

    let test = "https://api.coingecko.com/api/v3/simple/price?ids=";
    for (let i = 0; i < coins.length; i++) {
      if (i !== coins.length - 1) {
        test = test + coins[i] + "%2C";
      }
      else {
        test = test + coins[i] + "&vs_currencies=usd";
      }
    }

    const coinurl = test;
    fetch(coinurl, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },

    })
      .then(response => response.json())//解析为Promise
      .then(data => {
        this.setState({ pricedata: data })  ////赋值到本地数据
        console.log(this.state.pricedata)

      });
  }
/*   getmydata(){
    let bigmydata=this.state.characters;
    let mdata={};
    for(let i=0;i<bigmydata.length;i++){
        mdata[i].coin=bigmydata[i].coin;
        mdata[i].value=bigmydata[i].value;
    }
    this.setState({mydata:mdata})
  }

  saveMe(me) {
    const { userSession } = this.props;
    this.setState(me, { savingMe: true })
    let test = JSON.stringify(me);
    console.log(test);
    const options = { encrypt: false }
    userSession.putFile(ME_FILENAME, JSON.stringify(me), options)
      .finally(() => {
        this.setState({ savingMe: false, redirectToMe: false })
      })
  }

  loadMe() {
    const { userSession } = this.props;
    const options = { decrypt: false }
    userSession.getFile(ME_FILENAME, options)
      .then((content) => {
        if (content) {
          const me = JSON.parse(content)
          this.setState({ characters:me, redirectToMe: false })
        } else {
          const me = null
          this.setState({ characters:me,redirectToMe: true })
        }
      })
  } */



}


export default Appok;
