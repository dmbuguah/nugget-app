import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
    fontSize: "1.25rem",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    textAlign: "left",
    fontWeight: "700",
    marginBottom: "2px",
    paddingLeft: "10px"
  },
  header4: {
    fontSize: "2.125rem",
    textAlign: "left",
    paddingLeft: "10px"
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
                  <h2 className={classes.header2}>Create Case</h2>
                  <MultiStep steps={steps} />
                </div>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <h2 className={classes.header2}> All Cases</h2>
                    <h4 className={classes.header4}> 283,773 </h4>
                  </Paper>
                </Grid>
              </Grid>
            </div>
      )
  }
}

export default withStyles(styles) (CreateCase)
