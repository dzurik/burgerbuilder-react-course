import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Layout = (props) => {
  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerVisible(!sideDrawerVisible);
  };

  return (
    <Aux>
      <Toolbar isAuth={isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer
        isAuth={isAuthenticated}
        open={sideDrawerVisible}
        closed={sideDrawerClosedHandler}
      />
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
