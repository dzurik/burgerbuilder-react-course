import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.scss';

const logo = (props) => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img className={classes.Logo__img} src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;
