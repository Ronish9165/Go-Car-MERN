import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Stripe from 'react-stripe-checkout';

import { UserContext } from '../App';

const Mycart = () => {
  const { state, dispatch } = useContext(UserContext);

  const [cartUser, setCartUser] = useState([]);
  const [items, setItems] = useState([]);
  let itemsPrice;

  const history = useHistory();

  const getCartData = async () => {
    try {
      const res = await fetch('/getCartData', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        
      });

      const data = await res.json();
      console.log(data);
      setCartUser(data?.userById);
      setItems(data?.cartItems);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  items.map((item) => {
    itemsPrice = item.price;
  });

  const handlePayMethod = (itemsPrice, token) => {
    return fetch('/stripePay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token.id,
        amount: itemsPrice,
      }),
    });
  };

  const tokenHandler = (token) => {
    handlePayMethod(itemsPrice, token);
    updateDataBase();
  };

  const updateDataBase = () => {
    return fetch('/updateDataBase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
      }),
    });
  };

  const handleItemDeletion = async (itemId) => {
    try {
      window.alert('Are you sure you want to delete this item from your cart?');
      const res = await fetch('/deleteitemfromcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartitemid: itemId,
        }),
      });
      console.log('log');
      if (res.ok) {
        console.log('deleted');
        // Show pop-up message indicating successful deletion
        window.alert('Cart item has been deleted.');
        // Reload the page or update the cart data
        getCartData();
      } else {
        throw new Error('Unable to delete cart item.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Loginbutton = () => {
    if (state) {
      return (
        <div>
          <button>
            <NavLink className="btn" to="/signout">
              logout
            </NavLink>
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button>
            <NavLink className="btn" to="/signin">
              login
            </NavLink>
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <header className="header">
        <div id="menu-btn" className="fas fa-bars"></div>
        <NavLink className="logo" to="/">
          <span>Go</span>Car
        </NavLink>

        <nav className="navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/buycar">Sale Cars</NavLink>
          <NavLink to="/rentcar">Rent Cars</NavLink>
        </nav>

        <div id="login-btn">
          <Loginbutton />
        </div>
      </header>

      <div className="salecartMaindiv">
        <div style={{ marginTop: '150px' }}>
          {items.map((item) => (
            <div className="salecartLidiv" key={item._id}>
              <ul>
                <li style={{ wordSpacing: '10px' }}>
                  Brand: {item.brand} --- Model: {item.model} --- Quantity: {item.quantity} --- Price: {item.price}Rs{' '}
                  <button
                    style={{ background: 'red' }}
                    id={item._id}
                    onClick={() => handleItemDeletion(item._id)}
                    className="btn"
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </li>
              </ul>
            </div>
          ))}
          <div style={{ padding: '30px', textAlign: 'center' }}>
            <h2>Pay Through Credit / Debit Card</h2>
            <br />
            <Stripe
              className="payButton"
              stripeKey="pk_test_51Jyb5UBvc4Qazj8jy6qimLop4epxe5jziUD3ixj5ISycjjD6yYVGZhk688Pz9Lna32VTHbSHxRwkrvNNnnnr96P000M68u5jcd"
              token={tokenHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Mycart;
