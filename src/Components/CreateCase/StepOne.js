import React, {Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import StepTwo from './StepTwo'

const styles = theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 570,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 570,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class CaseInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);

    this.state.title = localStorage.getItem('title')
    this.state.description = localStorage.getItem('description')
  }
  handleChange = (event) =>{
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  componentDidUpdate() {
    localStorage.setItem('title', this.state.title)
    localStorage.setItem('description', this.state.description)
  }

  render () {
    const { classes } = this.props

    return (
        <div>
        <form
          className={classes.root}
          autoComplete="off">
            <FormControl className={classes.formControl}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Title"
              name="title"
              onChange={this.handleChange}
              defaultValue={this.state.title}/>
            </FormControl>
            <br/>
            <FormControl className={classes.formControl}>
            <TextField
              id="standard-basic"
              fullWidth
              multiline
              rowsMax="4"
              name="description"
              onChange={this.handleChange}
              defaultValue={this.state.description}
              label="Description"/>
            </FormControl>
           <br/>
      </form>
      </div>
    )
  }
}

export default withStyles(styles) (CaseInfor)
