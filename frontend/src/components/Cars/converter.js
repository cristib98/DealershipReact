import React from "react";
import axios from "axios";
import converter from "./converter.css";
import { Button } from 'react-bootstrap';
class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      fromCurrency: "EUR",
      toCurrency: "RON",
      amount: this.props.amount,
      currencies: []
    };
  }
  componentDidMount() {
    
    this.setState({ amount: this.props.amount})
    axios
      .get("http://api.exchangeratesapi.io/v1/latest?access_key=9f9d06ad5adfeff095ca924f43015033&format=1")
      .then(response => {
        const currencyAr = ["EUR"];
        for (const key in response.data.rates) {
          currencyAr.push(key);
        }
        this.setState({ currencies: currencyAr });
      })
      .catch(err => {
        console.log("eroare", err);
      });
  }
  convertHandler = () => {
    if (this.state.fromCurrency !== this.state.toCurrency) {
      axios
        .get(
          `http://api.exchangeratesapi.io/v1/latest?access_key=9f9d06ad5adfeff095ca924f43015033&format=1=${this.state.toCurrency}`
        )
        .then(response => {
          const result =
            this.state.amount * response.data.rates[this.state.toCurrency];
          this.setState({ result: result.toFixed(5) });
        })
        .catch(error => {
          console.log("Opps", error.message);
        });
    } else {
      this.setState({ result: "Nu poti converti in aceeasi moneda!" });
    }
  };
  selectHandler = event => {
    if (event.target.name === "from") {
      this.setState({ fromCurrency: event.target.value });
    } else {
      if (event.target.name === "to") {
        this.setState({ toCurrency: event.target.value });
        this.setState({ result: null})
      }
    }
  };

  priceOnClick = () => {
      this.setState({
          amount: this.props.amount
      })
      this.setState({ result: null})
  }



  render() {
    return (
      <div className="Converter">
        <h2>
          <span>Convertor</span>
          
        </h2>
        <i className='fas fa-euro-sign green-text fa-3x mb-5' />
        <div className="From">
          <input
            name="amount"
            type="text"
            value={this.state.amount}
            onChange={event => this.setState({ amount: event.target.value })}
          />
          <select
            name="from"
            disabled="true"
            onChange={event => this.selectHandler(event)}
            value={this.state.fromCurrency}
          >
            {this.state.currencies.map(cur => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
          <select
            name="to"
            onChange={event => this.selectHandler(event)}
            value={this.state.toCurrency}
          >
            {this.state.currencies.map(cur => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
          
          {this.state.result && <h3>{this.state.result} {this.state.toCurrency}</h3>}
        </div>
        <Button variant="link" onClick={this.priceOnClick}>Preț mașina actuală</Button>
        <Button variant="info" onClick={this.convertHandler}>Convert</Button>
      </div>
    );
  }
}
export default Converter;