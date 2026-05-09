import React from "react";
import { CartEmptyIcon } from "../../components/Icons/Icons";
import { browserRoutes } from "../../routes/browserRoutes";
const EmptyCart = ({ navigate }) => {
  return (
    <div className='row'>
      <div className='col-xl-12'>
        <div className='empty-cardhefnfd'>
          <div>
            <div className='d-flex justify-content-center mb-3'>
              <CartEmptyIcon />
            </div>
            <h3>Your Cart Is Empty</h3>
            <p className='pt-3'>
              Looks like you haven’t added any properties in your cart
            </p>
            <div className='d-flex justify-content-center mt-3'>
              <button
                className='pointer'
                onClick={() => navigate(browserRoutes.DASHBOARD)}
              >
                View Properties
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
