import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector((state) => state.constructorData);
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  // // /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!userData) {
      navigate('/login', { state: { from: '/' } });
      return;
    }
    if (!constructorItems.bun || orderRequest) {
      console.log('Не выбраны булки или orderRequest равен false');
      return;
    }
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
