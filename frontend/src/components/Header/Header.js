import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>React.js based, platform agnostic eCommerce</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
      {' · '}
    <Link to='/catalog' activeClassName='route--active'>
        Catalog
    </Link>
  </div>
)

export default Header
