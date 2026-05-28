import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const location = useLocation();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const ingredientData = ingredients.find((item) => item._id === id) || null;

  useEffect(() => {
    if (location.state?.background) {
      // Удаляем фоновое состояние, чтобы модальное окно не "застревало"
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
