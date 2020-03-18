import React, { Component, Fragment, createRef } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import axios from 'axios'

const styles = theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 500,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class CreateCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      target: '',
      target_file: createRef()
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
    // const response = axios.post(
    //     'http://127.0.0.1:8000/v1/case/cases/', {
    //       'title': this.state.title,
    //       'description': this.state.description,
    //       'target': this.state.target
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     })
    console.log(this.state)
    // console.log(response)
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
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="target">Target Input</InputLabel>
                    <Select
                        id="case-type"
                        name="target"
                        value={this.state.target}
                        onChange={this.handleChange}>
                        <MenuItem value="ANDROID">Android</MenuItem>
                        <MenuItem value="IOS">IOS</MenuItem>
                      </Select>
                  </FormControl>
                  <br/>
                  <input
                    className={classes.input}
                    id="icon-button-photo"
                    ref={this.state.target_file}
                    type="file"
                />
                <br/>
                  <Button
                    variant="contained"
                    type="submit">
                    Submit
                  </Button>
            </form>
          </Grid>

          <Grid container>
              <form
                className={classes.root}
                autoComplete="off"
                onSubmit={this.handleSubmit}>
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
