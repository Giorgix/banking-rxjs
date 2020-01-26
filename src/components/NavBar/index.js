import React, {useEffect} from 'react';
import './NavBar.module.css';
//import logo from '../../logo.svg';
import {branch} from '../../hoc';
import {firebaseAuth} from '../../firebase';

const Auth = branch(
  ({user}) => user && user.username,
  ({user}) => {
    return (
      <a className="dropdown-trigger" href="#!" data-target="dropdown1">
        <span className="username">{user.username}</span>
        <img className="user-avatar" src={user.profile_picture} alt="user profile" />
        <i className="material-icons right">arrow_drop_down</i>
      </a>
    )
  },
  ({authObject}) => {
    return (
      <a className="waves-effect waves-light btn" onClick={authObject}>
        Log in
        <i className="material-icons right">account_circle</i>
      </a>
    )
  }
)

export default function NavBar ({user, authObject}) {
  useEffect(() => {
      const elems = document.querySelectorAll('.dropdown-trigger');
      const instances = window.M.Dropdown.init(elems, {coverTrigger: false});

      return () => {
        instances && instances.forEach(instance => {
          instance.destroy();
        });
      };
    })

    return(
      <>
      <ul id="dropdown1" className="dropdown-content">
        <li><a href="#!">settings</a></li>
        <li><a href="#!">notifications</a></li>
        <li className="divider"></li>
        <li><a href="#!" onClick={() =>
          firebaseAuth.signOut().then(() => console.log('LOGGED OUT!')
          ).catch((error) => console.log('ERROR! ', error))}>logout</a></li>
      </ul>
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">
            <img src="/logo.svg" className="navbar-logo" alt="logo" />
            <span>Banking RxJS</span>
          </a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="sass.html">Dashboard</a></li>
            <li><a href="badges.html">My Products</a></li>
            <li><a href="collapsible.html">Add product</a></li>
            <li><Auth user={user} authObject={authObject}/></li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li><a href="sass.html">Dashboard</a></li>
        <li><a href="badges.html">My Products</a></li>
        <li><a href="collapsible.html">Add product</a></li>
      </ul>
      </>
    )
}