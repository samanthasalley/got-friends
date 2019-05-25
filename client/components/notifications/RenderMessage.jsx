/**
 * ************************************
 *
 * @module  RenderMessage
 * @author  boilerplate
 * @date    boilerplate
 * @description  Reusable component to render loading/error messages
 *               (i.e. when awaiting async data and/or
 *                when expected data is not there)
 *
 * ************************************
 */

// dependencies
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// components
import Header from '../ui-templates/Header';
// styles
import styles from '../../stylesheets/modules/notifications/RenderMessage.scss';

const RenderMessage = ({ header, children, icon, iconSpin, theme }) => {
  const mainClass = theme ? styles[theme] : '';
  return (
    <div className={mainClass}>
      {header &&
        <Header size="h2">
          {icon &&
            <span className="loading-icon" className={styles.icon}>
              <FontAwesomeIcon className={iconSpin ? 'fa-spin' : ''} icon={icon} />
            </span>
          }
          {header}
        </Header>
      }
      {children}
    </div>
  );
};

RenderMessage.propTypes = {
  children: PropTypes.any.isRequired,
  icon: PropTypes.object, // FontAwesomeIcon icon component
  theme: PropTypes.oneOf([
    'centered',
  ]), 
  header: PropTypes.string,
  iconSpin: PropTypes.bool, // set true if icon should spin
};

export default RenderMessage;