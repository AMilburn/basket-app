import React from 'react';
import PropTypes from 'prop-types';
import './BasketItem.css';

class BasketItem extends React.Component {
  render = () => {
    const { id, name, updateQty, itemCount, itemTotal } = this.props;
    return (
      <div className="basketApp__item">
        <div className="basketApp__itemContainer">
          <label htmlFor={name}>{name}</label>
          <input
            id={name}
            type="number"
            value={itemCount}
            onChange={(e) => updateQty(id, parseInt(e.target.value, 10))}
          />
        </div>
        <div className="basketApp__price">
          $ { itemTotal.toFixed(2) }
        </div>
        <button
          className="basketItem__remove"
          onClick={() => updateQty(id, 0)}
        >
          Remove item
        </button>
      </div>
    );
  }
}

BasketItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  updateQty: PropTypes.func.isRequired,
  itemCount: PropTypes.number.isRequired,
  itemTotal:PropTypes.number.isRequired,
};

export default BasketItem;