import React, { Component, PropTypes } from 'react';

export default class Picker extends Component {
    render() {
        const { value, onChange, pageSize, totalCount } = this.props;
        let pages = Math.ceil(parseInt(totalCount) / parseInt(pageSize));
        let options = [];
        for (var i = 1; i < pages; i++) {
            options[i] = i;
        }

        return (
            <span>
        <h1>Strona: {value}</h1>
        <select onChange={e => onChange(e.target.value)}
                value={value}>
          {options.map(option =>
              <option value={option} key={option}>
                  {option}
              </option>)
          }
        </select>
      </span>
        );
    }
}

Picker.propTypes = {
    pageSize: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
