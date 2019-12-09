import React from 'react';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import logo from './logo.svg';
import './App.css';

class AccountBalances extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checking: 0,
      savings: 0
    };
  }

  componentDidMount() {
    interval(1000).pipe(
      map(value => ({checking: value, savings: value}))
    ).subscribe(state => this.setState(state))
  }

  render() {
    return(
      <div className="account-info">
        <p>Checking {this.state.checking}</p>
        <p>Savings {this.state.savings}</p>
      </div>
    );
  }
};

const App = props => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AccountBalances />
      </header>
    </div>
  );
}

export default App;
