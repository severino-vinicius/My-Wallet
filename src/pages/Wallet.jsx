import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div className="bg-slate-200 flex flex-col items-center h-full ">
        <Header />
        <div className="my-8">
          <WalletForm />
        </div>
        <div>
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
