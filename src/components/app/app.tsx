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

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Preloader } from '@ui';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchAllIngredients } from '../../services/slices/ingredientsSlice';
import { authUser } from '../../services/slices/userSlice';
import { ProtectedRoute } from '../ui/routes/protected-route';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(authUser());
    dispatch(fetchAllIngredients());
  }, [dispatch]);

  const handleCloseModal = () => {
    navigate(-1);
  };

  console.log('App rendered, background = ', background);
  console.log('location.state = ', location.state);
  console.log('isModalOpen = ', !!background);
  return (
    <div className={styles.app}>
      <AppHeader />
      {/* prettier-ignore */}
      <Routes location={background || location}>
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
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Информация о заказе' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
