import 'date-fns';
import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar, Label
} from 'recharts';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import {withRouter } from 'react-router-dom'
import MessageIcon from '@material-ui/icons/Message';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import axios from 'axios';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  caseGrid: {
    padding: "4px",
    marginLeft: "14px",
    fontSize: "1.2rem",
    fontWeight: "400",
    color: "#999"
  },
  hr : {
    border: "0.6px solid #ddd",
    // marginTop: "90px"
  },
  hr1 : {
    border: "0.6px solid #ddd",
    marginTop: "90px"
  },
  maps: {
    padding: "10px",
    width: "100%",
    height: "100%"
  },
  paper: {
    padding: "10px"
  },
  extractIcon: {
    marginTop: "-23px",
    width: "65px",
    height: "65px",
    background: "#1abdd1",
    display: "flex",
    justifyContent: "center",
    borderRadius: "3px",
    float: "left"
  },
  innerExtractIcon: {
    height: "fit-content",
    width: "fit-content",
    marginTop: "14px"
  },
  header4: {
    fontSize: "2.125rem",
    textAlign: "left",
    paddingLeft: "10px"
  },
  extractDetailInfo: {
    float: "right"
  },
  encloseExtract: {
  },
  extractHeader: {
    fontSize: "14px",
    color: "#999",
    fontFamily: "Roboto,Helvetica,Arial,sans-serif"
  },
  extractInnerHeader: {
    lineHeight: "1"
  },
  gridWrapper: {
    marginBottom: "20px"
  },
  appBar: {
    background: "#1abdd1",
    color: "black"
  },
  extractDescription: {
    color: "#999"
  },
  datePicker: {
    float: "right",
    marginLeft: "20px"
  },
  datePickerOutLine: {
    display: "flow-root",
    padding: "10px"
  }
})

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

class AnalyseCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      casesId: null,
      value: 0,
      calls_by_day: {
          title: null,
          x_axis: null,
          y_axis: null,
          analysis_data: null
      },
      calls_by_ctype: {
          title: null,
          x_axis: null,
          y_axis: null,
          analysis_data: null
      },
      sms_sent_by_day: {
          title: null,
          x_axis: null,
          y_axis: null,
          analysis_data: null
      },
      sms_received_by_day: {
          title: null,
          x_axis: null,
          y_axis: null,
          analysis_data: null
      },
      sms_by_type_date: {
          title: null,
          x_axis: null,
          y_axis: null,
          analysis_data: null
      },
      location_case: {
        title: null,
        analysis_data: null,
      },
      dashboard_case: {
        sms: 0,
        call: 0,
        location: 0
      },
      bounds: null,
      selectedDate: new Date('2014-08-18T21:11:54')
    }
  }

  componentDidMount() {
    const caseId = this.props.location.state.id
    axios.get(
        `http://127.0.0.1:8000/v1/case/cases/case_analysis/?caseId=${caseId}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
            const cases = response.data;
            const cbd_keys = Object.keys(cases['calls_by_day']['analysis_data'][0]);
            const cbc_keys = Object.keys(cases['calls_by_ctype']['analysis_data'][0]);
            const ssbd_keys = Object.keys(cases['sms_sent_by_day']['analysis_data'][0]);
            const srbd_keys = Object.keys(cases['sms_received_by_day']['analysis_data'][0]);
            const sbtd_keys = Object.keys(cases['sms_by_type_date']['analysis_data'][0]);

            var calls_by_day = {...this.state.calls_by_day}
            var calls_by_ctype = {...this.state.calls_by_ctype}
            var sms_sent_by_day = {...this.state.sms_sent_by_day}
            var sms_received_by_day = {...this.state.sms_received_by_day}
            var sms_by_type_date = {...this.state.sms_by_type_date}
            var location_case = {...this.state.location_case}
            var dashboard_case = {...this.state.dashboard}

            calls_by_day.analysis_data = cases['calls_by_day']['analysis_data']
            calls_by_day.x_axis = cbd_keys[0]
            calls_by_day.y_axis = cbd_keys[1]
            calls_by_day.title = cases['calls_by_day']['title']

            calls_by_ctype.analysis_data = cases['calls_by_ctype']['analysis_data']
            calls_by_ctype.x_axis = cbc_keys[0]
            calls_by_ctype.y_axis = cbc_keys[1]
            calls_by_ctype.title = cases['calls_by_ctype']['title']

            sms_sent_by_day.analysis_data = cases['sms_sent_by_day']['analysis_data']
            sms_sent_by_day.x_axis = ssbd_keys[0]
            sms_sent_by_day.y_axis = ssbd_keys[1]
            sms_sent_by_day.title = cases['sms_sent_by_day']['title']

            sms_received_by_day.analysis_data = cases['sms_received_by_day']['analysis_data']
            sms_received_by_day.x_axis = srbd_keys[0]
            sms_received_by_day.y_axis = srbd_keys[1]
            sms_received_by_day.title = cases['sms_received_by_day']['title']

            sms_by_type_date.analysis_data = cases['sms_by_type_date']['analysis_data']
            sms_by_type_date.x_axis = sbtd_keys[0]
            sms_by_type_date.y_axis = sbtd_keys[1]
            sms_by_type_date.title = cases['sms_by_type_date']['title']

            location_case.analysis_data = cases['location_case']['analysis_data']
            location_case.title = cases['location_case']['title']

            dashboard_case.sms = cases['dashboard']['sms']
            dashboard_case.call = cases['dashboard']['call']
            dashboard_case.location = cases['dashboard']['location']

            this.setState(
              {
                  calls_by_day: calls_by_day,
                  calls_by_ctype: calls_by_ctype,
                  sms_sent_by_day: sms_sent_by_day,
                  sms_received_by_day: sms_received_by_day,
                  sms_by_type_date: sms_by_type_date,
                  location_case: location_case,
                  dashboard_case: dashboard_case
              })

            console.log(this.state.bounds)
      })
  }
  handleChange = (event, newValue) => {
     this.setState({value:newValue})
  };
  handleDateChange = (date) => {
    this.setState({selectedDate:date})
  };


  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  render() {
      const { classes } = this.props
      const style = {
        position: "relative",
        height: "500px"
      };
      const containerStyle = {
        position: "relative",
        width: '100%',
        height: '100%'
      };
      var points = [
          { lat: 42.02, lng: -77.01 },
          { lat: 42.03, lng: -77.02 },
          { lat: 41.03, lng: -77.04 },
          { lat: 42.05, lng: -77.02 }
      ]
      var bounds = new this.props.google.maps.LatLngBounds();
      for (var i = 0; i < points.length; i++) {
        bounds.extend(points[i]);
      }
      const { value } = this.state;

      return (
        <div className={classes.root}>
        <div className={classes.gridWrapper}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <div className={classes.encloseExtract}>
                  <div className={classes.extractIcon}>
                      <div className={classes.innerExtractIcon}>
                        <MessageIcon fontSize="large" />
                      </div>
                  </div>
                  <div className={classes.extractDetailInfo}>
                    <p className={classes.extractHeader}>Messages</p>
                    <h6 className={classes.extractInnerHeader}>{this.state.dashboard_case.sms}</h6>
                  </div>
                </div>
                <hr className={classes.hr1}/>
                <div className={classes.extractDescription}>
                  Message Information
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <div className={classes.encloseExtract}>
                    <div className={classes.extractIcon}>
                        <div className={classes.innerExtractIcon}>
                          <PhoneOutlinedIcon fontSize="large" />
                        </div>
                    </div>
                    <div className={classes.extractDetailInfo}>
                        <p className={classes.extractHeader}>Call Logs</p>
                        <h6 className={classes.extractInnerHeader}>{this.state.dashboard_case.call}</h6>
                    </div>
                  </div>
                  <hr className={classes.hr1}/>
                  <div className={classes.extractDescription}>
                    Calls Information
                  </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <div className={classes.encloseExtract}>
                  <div className={classes.extractIcon}>
                      <div className={classes.innerExtractIcon}>
                        <LocationOnOutlinedIcon fontSize="large" />
                      </div>
                  </div>
                  <div className={classes.extractDetailInfo}>
                      <p className={classes.extractHeader}>Location</p>
                      <h6 className={classes.extractInnerHeader}>{this.state.dashboard_case.location}</h6>
                  </div>
                </div>
                <hr className={classes.hr1}/>
                <div className={classes.extractDescription}>
                  Location Information
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <AppBar position="static" className={classes.appBar}>
          <Tabs value={value} onChange={this.handleChange} aria-label="simple tabs example">
            <Tab label="Messages" {...this.a11yProps(0)} />
            <Tab label="Calls" {...this.a11yProps(1)} />
            <Tab label="Location" {...this.a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                 <div>
                   <div className={classes.caseGrid}>
                     {this.state.sms_received_by_day.title}
                     <hr className={classes.hr}/>
                   </div>
                 </div>
                  <BarChart width={600} height={300} data={this.state.sms_received_by_day.analysis_data}
                         margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey={this.state.sms_received_by_day.x_axis}>
                     <Label value="Day of contact" offset={0} position="bottom" />
                   </XAxis>
                    <YAxis

                      label={{ value: 'No. Of SMS received', angle: -90,
                      position: 'insideBottomLeft', textAnchor: 'middle'}}/>
                    <Tooltip/>
                    <Legend />
                     <Bar dataKey="sms_count" fill="#8884d8" minPointSize={10} name='SMS count'/>
                   </BarChart>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                 <div>
                   <div className={classes.caseGrid}>
                     {this.state.sms_sent_by_day.title}
                     <hr className={classes.hr}/>
                   </div>
                 </div>
                  <BarChart width={600} height={300} data={this.state.sms_sent_by_day.analysis_data}
                         margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey={this.state.sms_sent_by_day.x_axis}>
                     <Label value="Day of contact" offset={0} position="bottom" />
                   </XAxis>
                    <YAxis label={{ value: 'No. Of SMS sent', angle: -90, position: 'insideBottomLeft', textAnchor: 'middle' }}/>
                    <Tooltip/>
                    <Legend />
                     <Bar dataKey="sms_count" fill="#82ca9d" minPointSize={10} name='SMS count'/>
                   </BarChart>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <div>
                    <div className={classes.caseGrid}>
                      {this.state.sms_by_type_date.title}
                      <hr className={classes.hr}/>
                    </div>
                  </div>
                  <BarChart width={600} height={300} data={this.state.sms_by_type_date.analysis_data}
                       margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="_sms_date">
                   <Label value="SMS date" offset={0} position="bottom" />
                 </XAxis>
                  <YAxis label={{ value: 'No. Of SMS', angle: -90, position: 'insideBottomLeft', textAnchor: 'middle' }}/>
                  <Tooltip/>
                  <Legend />
                  <Bar dataKey="inbox" stackId="a" fill="#8884d8" />
                  <Bar dataKey="sent" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="outbox" stackId="a" fill="#899a9d" />
                 </BarChart>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                 <div>
                   <div className={classes.caseGrid}>
                     {this.state.calls_by_day.title}
                     <hr className={classes.hr}/>
                   </div>
                 </div>
                  <BarChart width={600} height={300} data={this.state.calls_by_day.analysis_data}
                         margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey={this.state.calls_by_day.x_axis}>
                     <Label value="Day Of Call" offset={0} position="bottom" />
                   </XAxis>
                    <YAxis label={{ value: 'No. Of Calls', angle: -90, position: 'insideBottomLeft', textAnchor: 'middle' }}/>
                    <Tooltip/>
                    <Legend />
                     <Bar dataKey="call_count" fill="#82ca9d" minPointSize={10} name='Call count'/>
                   </BarChart>
                </Paper>
              </Grid>
              <Grid item xs={6}>
              <Paper className={classes.paper}>
                <div>
                  <div className={classes.caseGrid}>
                    {this.state.calls_by_ctype.title}
                    <hr className={classes.hr}/>
                  </div>
                </div>
                <BarChart width={600} height={300} data={this.state.calls_by_ctype.analysis_data}
                     margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="_call_date">
                 <Label value="Day Of Call" offset={0} position="bottom" />
               </XAxis>
                <YAxis label={{ value: 'No. Of Calls', angle: -90, position: 'insideBottomLeft', textAnchor: 'middle' }}/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="incoming" stackId="a" fill="#8884d8" />
                <Bar dataKey="outgoing" stackId="a" fill="#82ca9d" />
               </BarChart>
              </Paper>
              </Grid>
            </Grid>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={9}>
                <Paper className={classes.paper}>
                 <div>
                   <div className={classes.caseGrid}>
                     {this.state.location_case.title}
                     <hr className={classes.hr}/>
                   </div>
                 </div>
                 <div className={classes.datePickerOutLine}>
                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
                   <div className={classes.datePicker}>
                     <KeyboardDatePicker
                       disableToolbar
                       variant="inline"
                       format="MM/dd/yyyy"
                       margin="normal"
                       id="date-picker-from"
                       label="From"
                       value={this.state.selectedDate}
                       onChange={this.handleDateChange}
                       KeyboardButtonProps={{
                         'aria-label': 'change date',
                       }}/>
                    </div>
                    <div className={classes.datePicker}>
                     <KeyboardDatePicker
                       disableToolbar
                       variant="inline"
                       format="MM/dd/yyyy"
                       margin="normal"
                       id="date-picker-to"
                       label="To"
                       value={this.state.selectedDate}
                       onChange={this.handleDateChange}
                       KeyboardButtonProps={{
                         'aria-label': 'change date',
                       }}/>
                     </div>
                   </MuiPickersUtilsProvider>
                 </div>
                 <div className={classes.maps}>
                 <Map
                     google={this.props.google}
                     initialCenter={{
                         lat: 42.39,
                         lng: -72.52
                     }}
                     zoom={10}
                     style={style}
                     containerStyle={containerStyle}>
                     <Marker
                         name={'Dolores park'}
                         position={{lat: 42.39, lng: -72.52}} />
                       <Marker/>
                   </Map>
                   </div>
                </Paper>
              </Grid>
              <Grid item xs={3}>
              <Paper className={classes.paper}>
                <div>
                  <div className={classes.caseGrid}>
                    Location analysis
                    <hr className={classes.hr}/>
                  </div>
                </div>
              </Paper>
              </Grid>
            </Grid>
          </div>
          </TabPanel>
        </div>
      )
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  GoogleApiWrapper({apiKey: ('AIzaSyA_IzAR-eryh3_wh1iR3wfsGQoBMxi0HTo')})
) (AnalyseCase)
