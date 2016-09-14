// Copyright 2015, 2016 Ethcore (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import React, { Component, PropTypes } from 'react';

import Value from '../Value';
import styles from './price.css';

export default class Price extends Component {
  static propTypes = {
    coinSymbol: PropTypes.string.isRequired,
    price: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      minimum: PropTypes.number.isRequired,
      limit: PropTypes.number.isRequired
    })
  }

  render () {
    const { coinSymbol, price } = this.props;

    if (!price) {
      return (
        <div className={ styles.empty }>
          The price information is not available yet.
        </div>
      );
    }

    return (
      <div className={ styles.body }>
        <Value amount={ 1 } symbol={ coinSymbol } /> = <Value amount={ price.rate } /> (<Value amount={ price.minimum } symbol={ coinSymbol } /> minimum, <Value amount={ price.limit } symbol={ coinSymbol } /> maximum)
      </div>
    );
  }
}
