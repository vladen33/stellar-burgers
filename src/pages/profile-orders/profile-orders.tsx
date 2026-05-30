import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../services/slices/orderSlice';
import { Preloader } from '@ui';
import { getOrderIsLoadingSelector, getOrderOrdersSelector } from '@selectors';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getOrderIsLoadingSelector);
  const orders: TOrder[] = useSelector(getOrderOrdersSelector);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
