import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

import {CartEmpty} from '../../redux/cart/cart-actions'

const StripeCheckoutButton = ({price,CartEmpty}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51KI5NOSDJDrQogjPeK85Pu3gfbyfczIFdcvsoGoVdosySc4vJ8fNCTipSgCh6GSAnhToLqMvlA6WnNgcUXmoquWV00j0EL81RS';

    const onToken = (token) => {
        console.log(token);
        CartEmpty();
        alert("Payment is sucessfull")
    }

    return(
        <StripeCheckout 
            label='Pay Now'
            name= 'Food Ordering system'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

const mapDispatchToProps = (dispatch) => ({
    CartEmpty: () => dispatch(CartEmpty())
})

export default connect(null,mapDispatchToProps)(StripeCheckoutButton)