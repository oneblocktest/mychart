import React, {Component} from 'react';

//import { Navbar, Jumbotron, Button } from 'react-bootstrap';

class Form extends Component {
    constructor(props) {
        super(props);
        
        this.initialState = {
           coin:'',
           value:'',
           price:'',
          valuedata:''
        };

        this.state = this.initialState;
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name] : value
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {
        const { coin,value} = this.state; 

        return (
            <form onSubmit={this.onFormSubmit}>
                <label htmlFor="coin">coin:</label>
                <input 
                    type="text" 
                    name="coin" 
                    id="coin"
                    value={coin} 
                    onChange={this.handleChange} /><br />
                <label htmlFor="value">value:</label>
                <input 
                    type="text" 
                    name="value" 
                    id="value"
                    value={value} 
                    onChange={this.handleChange} /><br />
                <button type="submit">
                    录入
                </button>
            </form>
        );
    }
}



export default Form;


