/**
 * Dropdown Component
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';
import styles from './styles.css';

class Dropdown extends Component {
  static propTypes = {
    options: PropTypes.object.isRequired,
    current: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  state = {
    isOpen: false,
  }

  get body() {
    return (
      <div className={styles.dropdownBody}>
        {Object.keys(this.props.options)
          .filter(key => key !== this.props.current)
          .map(key =>
            <button
              key={key}
              value={key}
              onClick={this.handleClick}
            >
              {this.props.options[key]}
            </button>)}
      </div>
    );
  }

  handleClick = (e) => {
    this.props.onChange(e.target.value);
    this.close();
  }

  close = () => this.setState({ isOpen: false });

  toggle = () => this.setState(state => ({ isOpen: !state.isOpen }));

  handleClickOutside = this.close;

  render() {
    return (
      <div className={styles.dropdown}>
        <button
          type="button"
          className={styles.dropdownButton}
          onClick={this.toggle}
        >
          {this.props.current}
        </button>
        {this.state.isOpen && this.body}
      </div>
    );
  }
}

export default enhanceWithClickOutside(Dropdown);
