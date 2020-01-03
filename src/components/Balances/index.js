import React from 'react';
import AccountBalance from '../AccountBalance';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

// Creates a composite class for both accounts
export default class Balances extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checking: 0,
      savings: 0,
    };
  }

  componentDidMount() {

    // Subscribes to updates on the balances
    this.props.appState$.pipe(
      distinctUntilChanged('accounts'),
      pluck('accounts'),
    ).subscribe(({checking, savings}) => {
      this.setState({checking, savings})
    });
  }

  onChange(e) {
    console.log('change input... ', e.target.value);
    
  }

  render() {
    const { checking, savings } = this.state;

    // Renders the component as the composition of two subcomponents
    return(
      <div className="account-info row">
        <AccountBalance onChange={this.onChange} {...this.props} name="Checking" value={checking} />
        <AccountBalance onChange={this.onChange} {...this.props} name="Savings" value={savings} />
      </div>
    )
  }
}