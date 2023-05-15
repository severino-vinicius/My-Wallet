import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div>
          Wallet
        </div>
        <WalletForm />
        <hr />
        <Table />
      </>
    );
  }
}

export default Wallet;
