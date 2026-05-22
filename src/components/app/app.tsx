import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Preloader } from '@ui';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import store, { useDispatch } from '../../services/store';
import {
  ingredientsSelector,
  fetchIngredients
} from '../../services/ingredientsSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);
  /** TODO: взять переменные из стора */
  const isIngredientsLoading = store.getState().ingredients?.loading;
  const ingredients = store.getState().ingredients?.ingredients;
  const error = store.getState().ingredients?.error;

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />}>
          <Route path='orders' element={<ProfileOrders />} />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {/*{isIngredientsLoading ? (*/}
      {/*  <Preloader />*/}
      {/*) : error ? (*/}
      {/*  <div className={`${styles.error} text text_type_main-medium pt-4`}>*/}
      {/*    {error}*/}
      {/*  </div>*/}
      {/*) : ingredients.length > 0 ? (*/}
      {/*  <ConstructorPage />*/}
      {/*) : (*/}
      {/*  <div className={`${styles.title} text text_type_main-medium pt-4`}>*/}
      {/*    Нет игредиентов*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};

export default App;
