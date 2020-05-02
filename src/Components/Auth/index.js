import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AssessmentIcon from '@material-ui/icons/Assessment';

import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
})

class Auth extends Component {
  constructor() {
    super()
    this.authenticated = false
  }

  login(cb) {
    this.authenticated = true
    cb()
  }

  logout(cb) {
    this.authenticated = false
    cb()
  }

  isAuthenticated() {
    return this.authenticated
  }
}

export default withStyles(styles) (Auth)
