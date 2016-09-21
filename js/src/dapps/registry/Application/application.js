import React, { Component, PropTypes } from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
const muiTheme = getMuiTheme(lightBaseTheme);

import CircularProgress from 'material-ui/CircularProgress';
import styles from './application.css';
import Accounts from '../accounts';
import Lookup from '../Lookup';
import Register from '../register';
import Records from '../records';
import Events from '../events';

const nullable = (type) => React.PropTypes.oneOfType([ React.PropTypes.oneOf([ null ]), type ]);

export default class Application extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
    api: PropTypes.object.isRequired
  };
  getChildContext () {
    return { muiTheme, api: window.parity.api };
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    accounts: PropTypes.object.isRequired,
    contacts: PropTypes.object.isRequired,
    contract: nullable(PropTypes.object.isRequired),
    fee: nullable(PropTypes.object.isRequired),
    lookup: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
    register: PropTypes.object.isRequired,
    records: PropTypes.object.isRequired
  };

  render () {
    const {
      actions,
      accounts, contacts,
      contract, fee,
      lookup,
      events,
      register,
      records
    } = this.props;

    return (
      <div>
        <div className={ styles.header }>
          <h1>RΞgistry</h1>
          <Accounts { ...accounts } actions={ actions.accounts } />
        </div>
        { contract && fee ? (
          <div>
            <Lookup { ...lookup } accounts={ accounts.all } contacts={ contacts } actions={ actions.lookup } />
            <Register { ...register } fee={ fee } actions={ actions.register } />
            <Records { ...records } actions={ actions.records } />
            <Events { ...events } accounts={ accounts.all } contacts={ contacts } actions={ actions.events } />
            <p className={ styles.address }>
              The Registry is provided by the contract at <code>{ contract.address }.</code>
            </p>
          </div>
        ) : (
          <CircularProgress size={ 1 } />
        ) }
      </div>
    );
  }

}
