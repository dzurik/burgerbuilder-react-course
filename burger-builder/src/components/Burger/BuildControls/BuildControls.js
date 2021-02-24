import classes from './BuildControls.module.scss';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong> $
      </p>
      {controls.map((ctrl) => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.type}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
          />
        );
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuth ? 'Order NOW' : 'SIGN UP TO ORDER'}
      </button>
    </div>
  );
};

export default buildControls;
