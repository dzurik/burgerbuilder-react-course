import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {
  const ordersState = useSelector((state) => {
    return state.order.orders;
  });

  const loading = useSelector((state) => {
    return state.order.loading;
  });

  const token = useSelector((state) => {
    return state.auth.token;
  });

  const userId = useSelector((state) => {
    return state.auth.userId;
  });

  const dispatch = useDispatch();
  const onFetchOrders = useCallback(
    (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    [dispatch]
  );

  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  let orders = <Spinner />;
  if (!loading) {
    orders = ordersState.map((order) => (
      <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
    ));
  }

  return <div>{orders}</div>;
};

export default withErrorHandler(Orders, axios);
