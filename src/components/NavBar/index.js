import React, {useEffect} from 'react';
import Link from 'next/link';
import './NavBar.module.css';
import {branch, withConnectedActions} from '../../hoc';

const Auth = branch(
  ({user}) => user && user.username,
  ({user, logOut}) => {

    useEffect(() => {
      const dropdownElems = document.querySelectorAll('.dropdown-trigger');
      const dropdownInstances = window.M.Dropdown.init(dropdownElems, {coverTrigger: false});

      return () => {
        dropdownInstances && dropdownInstances.forEach(instance => {
          instance.destroy();
        });
      };
    });

    return (
      <React.Fragment>
        <ul id="dropdown1" className="dropdown-content">
          <li><Link href="/account"><a>account</a></Link></li>
          <li><a href="#!">notifications</a></li>
          <li className="divider"></li>
          <li><a href="#!" onClick={() => logOut()}>logout</a></li>
        </ul>
        <a className="dropdown-trigger" href="#!" data-target="dropdown1">
          <span className="username">{user.username}</span>
          <img className="user-avatar" src={user.profile_picture} alt="user profile" />
          <i className="material-icons right">arrow_drop_down</i>
        </a>
      </React.Fragment>
    )
  },
  () => {
    return (
      <Link href="/login">
        <a className="waves-effect waves-light btn">
          Log in
          <i className="material-icons right">account_circle</i>
        </a>
      </Link>
    )
  }
)


function NavBar ({user, authObject, logOut}) {

  const loggedNav = () => {
    return(
      <React.Fragment>
        <li><Link href="/account"><a>Account</a></Link></li>
        <li><a href="badges.html">My Products</a></li>
        <li><Link href="/product/add"><a>Add product</a></Link></li>
      </React.Fragment>
    )
  };

  const notLoggedNav = (user) => {
    return(
      <React.Fragment>
        <li><a href="sass.html">About</a></li>
        <li><a href="collapsible.html">Sign Up</a></li>
      </React.Fragment>
    )
  };

  const Menu = branch(
    ({user}) => user && user.username,
    ({user}) => loggedNav(user),
    () => notLoggedNav()
  );

  useEffect(() => {
    var sidenavElems = document.querySelectorAll('.sidenav');
    var sidenavInstances = window.M.Sidenav.init(sidenavElems);

    return () => {
      sidenavInstances && sidenavInstances.forEach(instance => {
        instance.destroy();
      });
    };
  });

  return(
    <>
    <nav>
      <div className="nav-wrapper">
        <Link href="/">
          <a className="brand-logo">
            <img src="/logo.svg" className="navbar-logo" alt="logo" />
            <span>Banking RxJS</span>
          </a>
        </Link>
        <a href="#" data-target="mobile-demo" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <Menu user={user}/>
          <li><Auth logOut={logOut} user={user} authObject={authObject}/></li>
        </ul>
      </div>
    </nav>
    <ul className="sidenav" id="mobile-demo">
      <Menu user={user}/>
      <li><Link href="/account"><a>account</a></Link></li>
      <li><a href="#!">notifications</a></li>
      <li className="divider"></li>
      <li><a href="#!" onClick={() => logOut()}>logout</a></li>
    </ul>
    </>
  )
}

export default withConnectedActions(['logOut'])(NavBar);