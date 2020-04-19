import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 570,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  button: {
    float: 'right',
    marginRight: 20
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class CaseTargetInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      case_target: '',
      target_path: '',
      itarget_type: [],
      title: '',
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.target_types = [
      'Calls',
      'Messages',
      'Location'
    ];
    this.state.title = localStorage.getItem('title')
    this.state.description = localStorage.getItem('description')
  }

  handleChange = (event) =>{
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
    console.log(nam)
    console.log(val)
  }

  handleSubmit = (event) =>{
    const response = axios.post(
        'http://127.0.0.1:8000/v1/case/cases/create_case/', {
          'title': this.state.title,
          'description': this.state.description,
          'platform': this.state.case_target,
          'file_path': this.state.target_path,
          'extract': this.state.itarget_type

        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
    console.log(response)
    event.preventDefault();
  }

  render () {
    const { classes } = this.props

  return (
    <div>
        <form onSubmit={this.handleSubmit}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="case_target">Target Input</InputLabel>
            <Select
                id="case-target"
                name="case_target"
                value={this.state.case_target}
                onChange={this.handleChange}>
                <MenuItem value="ANDROID">Android</MenuItem>
                <MenuItem value="IOS">IOS</MenuItem>
              </Select>
          </FormControl>
          <br/>
          <FormControl className={classes.formControl}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Target Path"
              name="target_path"
              onChange={this.handleChange}
              defaultValue={this.state.target_path}/>
          </FormControl>
          <br/>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Target</InputLabel>
            <Select
              labelid="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              name="itarget_type"
              value={this.state.itarget_type}
              onChange={this.handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}>
              {this.target_types.map(target_type => (
                <MenuItem key={target_type} value={target_type} >
                  {target_type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br/>
          <Button
            type="submit"
            className={classes.button}
            size="medium"
            variant="outlined">
            Submit
          </Button>
      </form>
    </div>
    );
  }
}
export default withStyles(styles) (CaseTargetInfor)
