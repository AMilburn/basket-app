import React, { Component } from 'react';
import BasketItem from './components/BasketItem';
import './App.css';

class App extends Component {
  constructor() {
    super();
    // Store all qty and pricing info in state
    this.state = {
      fruitIds: [],
      fruitData: {},
    };
  }
  
  // Takes a fruit object and returns the total price of that fruit based on quantity
  calculateItemPrice = (fruit) => {
    const { id, unitPrice, salePrice, saleQty } = fruit;
    // find the updated fruit qty
    const fruitQty = this.state.fruitData[id].qty;
    if (!saleQty) {
      // calculate the cost of all items with no special pricing
      const itemPrice = fruitQty * unitPrice;
      return (Math.round(itemPrice * 100) / 100);
    }
    // calculate the cost of items with special pricing available
    const qtyNotEligibleForSale = fruitQty % saleQty;
    const qtyEligibleForSale = fruitQty - qtyNotEligibleForSale;
    // multiply by the price per unit
    const itemPrice = (qtyNotEligibleForSale * unitPrice) + (qtyEligibleForSale * salePrice);
    return (Math.round(itemPrice * 100) / 100);
  }

  // Takes an array of fruits and returns the total cost
  calculateTotal = (basketArray) => {
    const totalPrice = basketArray.reduce((prevTotal, currentItem) => {
      const newItemPrice = this.calculateItemPrice(currentItem);
      return prevTotal + newItemPrice;
    }, 0);
    return totalPrice.toFixed(2);
  }

  // Takes a fruit id and input value and updates that fruit's quantity in state
  updateQty = (fruitId, value) => {
    if (value < 0) return;
    this.setState(prevState => ({
      fruitData: {
        ...prevState.fruitData,
        [fruitId]: {
          ...prevState.fruitData[fruitId],
          qty: value,
        },
      },
    }));
  }

 // Before mount, fetch the basket of items
 componentDidMount() {
    return fetch('http://localhost:4000/api/basket')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return this.setState({
          fruitIds: json.ids,
          fruitData: json.data,
        });
      })
      .catch((error) => {
        return error;
      });
  }

  render() {
    const { fruitIds, fruitData } = this.state;
    if (!fruitIds) return; // Return if there is no data back from API
    const basketArray = fruitIds.map(id => fruitData[id]);
    return (
      <div className="basketApp">
        <h1>Fruit Basket</h1>
        <div className="basketApp__container">
          {basketArray.map(fruit => {
            if (!fruit.qty) return null; // Do not display item if quantity is 0
            return (
              <BasketItem
                key={fruit.id}
                id={fruit.id}
                name={fruit.name}
                updateQty={this.updateQty}
                itemCount={fruit.qty}
                itemTotal={this.calculateItemPrice(fruit)}
              />
            );
          })}
          <div className="basketApp__total">
            Total: <span>$ { this.calculateTotal(basketArray) }</span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
