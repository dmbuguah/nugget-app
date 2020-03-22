import React, { Component, Fragment } from 'react'
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    width: 400,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});


class ListCases extends Component {
  constructor(props) {
    super(props);
    localStorage.clear()
  }

  render() {
      const { classes } = this.props

      function FormRow() {
          return (
            <Fragment>
              <Grid item xs={4}>
                  <Card className={classes.root}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Case 1
                    </Typography>
                    <Typography variant="body2" component="p">
                      First forensic case ....
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={4}>
              <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Case 1
                </Typography>
                <Typography variant="body2" component="p">
                  First forensic case ....
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
              </Grid>
              <Grid item xs={4}>
              <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Case 1
                </Typography>
                <Typography variant="body2" component="p">
                  First forensic case ....
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
              </Grid>
            </Fragment>
          );
        }
      return (
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            <FormRow />
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <FormRow />
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <FormRow />
          </Grid>
      </Grid>
      )
  }
}

export default withStyles(styles)(ListCases)
