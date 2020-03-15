import React, { Component, Fragment } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 500,
    },
  },
});

class CreateCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) =>{
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  handleSubmit = (event) =>{
    alert('A name was submitted: ' + this.state.title);
    event.preventDefault();
  }

  render() {
      const { classes } = this.props
      return (
        <Fragment>
          <CssBaseline />
          <Grid container>
              <form
                className={classes.root}
                autoComplete="off"
                onSubmit={this.handleSubmit}>
                <TextField
                  id="standard-basic"
                  fullWidth
                  label="Title"
                  name="title"
                  onChange={this.handleChange}
                  defaultValue={this.state.title}/>
                <br/>
                <TextField
                  id="standard-basic"
                  fullWidth
                  multiline
                  rowsMax="4"
                  name="description"
                  onChange={this.handleChange}
                  defaultValue={this.state.description}
                  label="Description"/>
                <br/>
                <Button
                  variant="contained"
                  type="submit">
                  Submit
                </Button>
            </form>
          </Grid>
        </Fragment>
      )
  }
}

export default withStyles(styles) (CreateCase)
