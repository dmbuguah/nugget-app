import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import BallotIcon from '@material-ui/icons/Ballot';
import AssessmentIcon from '@material-ui/icons/Assessment';

import { withStyles } from '@material-ui/core/styles'
import MultiStep from 'react-multistep'
import { steps } from './steps'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  header2: {
    color: "#90caf9",
    fontSize: "1.2rem",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    textAlign: "left",
    fontWeight: "500",
    marginBottom: "2px",
    paddingLeft: "10px"
  },
  header4: {
    fontSize: "2.125rem",
    textAlign: "left",
    paddingLeft: "10px"
  },
  caseInfo: {
    display: "flex",
    alignItems: "center"
  }
})

class CreateCase extends Component {

  render() {
      const { classes} = this.props

      const createCase = {
          boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
          padding: "10px",
          paddingBottom: "15px",
      };
      return (
            <div className={classes.root}>
              <Grid container spacing={2}>
                <Grid item xs={9}>
                <div style={createCase} className="multi-container">
                  <MultiStep steps={steps} />
                </div>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <div className={classes.caseInfo}>
                      <AssessmentIcon fontSize="large" />
                      <h2 className={classes.header2}> All Cases</h2>
                    </div>
                    <h4 className={classes.header4}> 283,773 </h4>
                  </Paper>
                </Grid>
              </Grid>
            </div>
      )
  }
}

export default withStyles(styles) (CreateCase)
