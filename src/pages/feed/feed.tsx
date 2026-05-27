import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrdersAll } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.feed.orders);
  const loading = useSelector((state) => state.feed.loading);
  const error = useSelector((state) => state.feed.error);
  /** TODO: взять переменную из стора */
  useEffect(() => {
    dispatch(fetchOrdersAll());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchOrdersAll());
      }}
    />
  );
};
