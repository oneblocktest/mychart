import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Table from './Table.js';
import Form from './Form.js';
import { AppConfig } from 'blockstack'
import Mchart from "./Mchart.js";



export const appConfig = new AppConfig(['store_write', 'publish_data'])
export const ME_FILENAME = 'mychart.json'
export const SUBJECTS_FILENAME = 'subjects.json'

class Appok extends Component {
/*   constructor(props) {
    super(props);
    //this.state
  }; */

  state = {
    characters: [],
    pricedata: [],
    savingMe: false,
    redirectToMe: false,
    option: {}


  };


  handleSubmit = character => {
    character.price = this.state.pricedata[character.coin].usd
    character.valuedata = character.price * character.value
    this.setState({ characters: [...this.state.characters, character] });
 
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
              <Mchart  characters={characters} />
              </div>
              <div className="col-md-12">
                <h3>Add New</h3>

                <div className="form-group">
                  <Form handleSubmit={this.handleSubmit} />
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-lg"
                    id="savemefile"
                    onClick={()=>this.saveMe(this.state.characters)}
                  >
                    saveme
          </button>
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
        this.loadMe();
        console.log(this.state.pricedata)
      });
  }



  saveMe(me) {
    const { userSession } = this.props;
    this.setState( {savingMe: true })
    let test = JSON.stringify(me);
    console.log(test);
    const options = { encrypt: true }
    userSession.putFile(ME_FILENAME, JSON.stringify(me), options)
      .finally(() => {
        this.setState({ savingMe: false, redirectToMe: false })
      })
  }

  loadMe() {
    const { userSession } = this.props;
    const options = { decrypt: true }
    userSession.getFile(ME_FILENAME, options)
      .then((content) => {
        if (content) {
          const me = JSON.parse(content)
          let loaddata=[];
          if(this.state.pricedata != null){
              for(let i=0;i<me.length;i++){
                let test={
                  coin:"",
                  value:"",
                  price:"",
                  valuedata:""
                }
                test.coin=me[i].coin;
                test.value=me[i].value;
                test.price=this.state.pricedata[test.coin].usd
                test.valuedata=test.value * test.price
                loaddata.push(test);
              }
            this.setState({ characters:loaddata, redirectToMe: false })
          }

          
        } else {
          const me = null
          this.setState({ character:me,redirectToMe: true })
        }
      })
  } 


  }


export default Appok;
