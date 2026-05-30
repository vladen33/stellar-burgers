import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrdersAll } from '../../services/slices/feedSlice';
import { getFeedIsLoadingSelector, getFeedOrdersSelector } from '@selectors';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getFeedOrdersSelector);
  const isLoading = useSelector(getFeedIsLoadingSelector);

  useEffect(() => {
    dispatch(fetchOrdersAll());
  }, [dispatch]);

  if (isLoading) {
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
