import React from 'react';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import './VerticalNavBar.css';

function VerticalNavBar({ sidebarVisible, toggleSidebarVisibility }) {
  const location = useLocation();

  return (
    <Sidebar
      as={Menu}
      animation='overlay'
      vertical
      inverted
      size='large'
      visible={sidebarVisible}
      className="vertical-navbar"
    >
      <Menu.Item onClick={toggleSidebarVisibility}>
        <Icon name='remove' />
      </Menu.Item>

      <Menu.Item
        as={Link}
        to="/"
        active={location.pathname === '/' || location.pathname === '/solar-ui-fyp/'}
        onClick={toggleSidebarVisibility}
      >
        <Icon name='dashboard' /> Overview
      </Menu.Item>

      <Menu.Item
        as={Link}
        to="/data"
        active={location.pathname.startsWith('/data')}
        onClick={toggleSidebarVisibility}
      >
        <Icon name='microchip' /> Live Sensor Data
      </Menu.Item>

      {/* Example for future menu items:
      <Menu.Item as={Link} to="/inverters" onClick={toggleSidebarVisibility}>
        <Icon name='plug' /> Inverters
      </Menu.Item>
      <Menu.Item as={Link} to="/batteries" onClick={toggleSidebarVisibility}>
        <Icon name='battery full' /> Batteries
      </Menu.Item>
      <Menu.Item as={Link} to="/account" onClick={toggleSidebarVisibility}>
        <Icon name='user' /> My Account
      </Menu.Item>
      */}
    </Sidebar>
  );
}

VerticalNavBar.propTypes = {
  sidebarVisible: PropTypes.bool.isRequired,
  toggleSidebarVisibility: PropTypes.func.isRequired,
};

export default VerticalNavBar;
