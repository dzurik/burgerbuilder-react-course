import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { useSelector } from 'react-redux';

const Checkout = (props) => {
  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });

  const purchased = useSelector((state) => {
    return state.order.purchased;
  });

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to="/" />;

  if (ings) {
    const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
          ingredients={ings}
        />
        <Route path={props.match.path + '/contact-data'} component={ContactData} />
      </div>
    );
  }
  return summary;
};

export default Checkout;
