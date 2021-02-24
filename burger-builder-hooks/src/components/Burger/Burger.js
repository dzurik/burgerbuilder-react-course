import classes from './Burger.module.scss';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredientName) => {
      return [...Array(props.ingredients[ingredientName])].map((_, i) => {
        return <BurgerIngredient key={ingredientName + i} type={ingredientName} />;
      });
    })
    .reduce((accumulator, currentValue) => {
      return accumulator.concat(currentValue);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
