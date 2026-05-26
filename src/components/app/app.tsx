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

import { AppHeader, IngredientDetails, OrderInfo } from '@components';
import { Preloader } from '@ui';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchAllIngredients } from '../../services/ingredientsSlice';
import { ProtectedRoute } from '../ui/routes/protected-route';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllIngredients());
  }, []);
  /** TODO: взять переменные из стора */
  const isLoading = useSelector((state) => state.ingredients.loading);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const error = useSelector((state) => state.ingredients.error);
  return (
    <div className={styles.app}>
      <AppHeader />
      {/* prettier-ignore */}
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<ProtectedRoute><Login /></ProtectedRoute>}/>
        <Route path='/register' element={<ProtectedRoute><Register /></ProtectedRoute>}/>
        <Route path='/forgot-password' element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>}/>
        <Route path='/reset-password' element={<ProtectedRoute><ResetPassword /></ProtectedRoute>}/>
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        <Route path='/profile/orders' element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>}/>

        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
