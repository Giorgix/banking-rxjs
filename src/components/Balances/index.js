import React from 'react';
import AccountBalance from '../AccountBalance';

// Creates a composite class for both accounts
export default class Balances extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checking: 0,
      savings: 0
    };
  }

  componentDidMount() {

    // Subscribes to updates on the balances
    this.props.balance$.subscribe(([checking, savings]) => {
      this.setState({checking, savings})
    });
  }

  render() {
    const { checking, savings } = this.state;

    // Renders the component as the composition of two subcomponents
    return(
      <div className="account-info">
        <AccountBalance name="Checking" value={checking} />
        <AccountBalance name="Savings" value={savings} />
      </div>
    )
  }
}