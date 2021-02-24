import classes from './BurgerIngredient.module.scss';
import propTypes from 'prop-types';

const burgerIngredient = (props) => {
  let ingredient = null;

  if (props.type === 'bread-bottom') {
    ingredient = <div className={classes.BreadBottom}></div>;
  }

  if (props.type === 'bread-top') {
    ingredient = (
      <div className={classes.BreadTop}>
        <div className={classes.Seeds1}></div>
        <div className={classes.Seeds2}></div>
      </div>
    );
  }

  if (props.type === 'meat') {
    ingredient = <div className={classes.Meat}></div>;
  }

  if (props.type === 'cheese') {
    ingredient = <div className={classes.Cheese}></div>;
  }

  if (props.type === 'salad') {
    ingredient = <div className={classes.Salad}></div>;
  }

  if (props.type === 'bacon') {
    ingredient = <div className={classes.Bacon}></div>;
  }

  return ingredient;
};

burgerIngredient.propTypes = {
  type: propTypes.string.isRequired,
};

export default burgerIngredient;
