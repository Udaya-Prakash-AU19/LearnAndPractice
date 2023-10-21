import React, { Component } from 'react'
import styles from './NavBar.module.css';


export default class NavBar extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <nav className={ `${styles['nav-bg']} d-flex` }>
          <a className="p-2" href="../Home.jsx">
            Home
          </a>
          <a className="p-2" href="../Posts.jsx">
            Posts
          </a>
          <a className="p-2" href="../HooksPractice.jsx">
            Hooks Practice
          </a>
      </nav>
    )
  }
}
