import 'date-fns';
import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types'
import {
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
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
    padding: "10px",
    height: "100%"
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
  },
  locationTitle: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#333"
  },
  locationBTitle: {
    fontSize: "13px"
  },
  sentRecipient: {
    fontSize: "12px",
    color: "#999",
  },
  dateSent: {
    fontSize: "14px",
    color: "#999",
  },
  sentMsg: {
    border: "1px solid #999",
    padding: "10px",
    borderRadius: "10px",
    marginLeft: "10px",
    width: "-webkit-fill-available"
  },
  sentTitle: {
    fontSize: "14px",
    color: "#333"
  },
  encloseSent: {
    display: "flex",
    marginBottom: "3px"
  },
  sentInnerDiv: {
    marginLeft: "10px"
  },
  verticalTab: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  verticalTabConTimeLine: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 400,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    overflow: "unset"
  },
  smsDivWrapper: {
    marginBottom: "15px"
  },
  smsDiv: {
    background: "#efe1e1",
    padding: "5px",
    borderRadius: "5px"
  },
  drDiv: {
    fontSize: "12px",
    textAlign: "right"
  },
  tabPanelVerticalDiv: {
    width: "-webkit-fill-available",
    overflowY: "scroll"
  },
  noResult: {
    textAlign: "center",
    fontSize: "20px",
    padding: "15%"
  },
  minDev: {
    float: "right",
    padding: "15px"
  },
  inbox: {
    backgroundColor: "antiquewhite",
    margin: "10px",
    width: "350px",
    float: "left",
    padding: "8px",
    borderRadius: "8px"
  },
  sent: {
    backgroundColor: "antiquewhite",
    margin: "10px",
    width: "350px",
    float: "right",
    padding: "8px",
    borderRadius: "8px"
  },
  incoming: {
    backgroundColor: "antiquewhite",
    margin: "10px",
    padding: "8px",
    borderRadius: "8px",
    width: "100%",
    display: "flow-root"
  },
  convDate: {
    textAlign: "right",
    fontSize: "small"
  },
  convLocation: {
    textAlign: "right",
    fontSize: "small"
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

function TabPanelVertical(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component='div'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

TabPanelVertical.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yPropsVertical(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

class AnalyseCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      casesId: null,
      value: 0,
      outgoing_calls_by_day: {
          title: null,
          x_axis: null,
          y_axis: null,
          analysis_data: null
      },
      incoming_calls_by_day: {
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
      selectedToDate: new Date('2014-08-18T21:11:54'),
      selectedFromDate: new Date('2014-08-18T21:11:54'),
      selectedPlace: {},
      activeMarker: {},
      showingInfoWindow: true,
      title: null,
      address: null,
      timestamp: null,
      location_timeline: {
        title: null,
        analysis_data: {
          messages: [],
          incoming_calls: [],
          outgoing_calls: []
        }
      },
      r_sms_break_down: {
        title: null,
        analysis_data: []
      },
      s_sms_break_down: {
        title: null,
        analysis_data: []
      },
      i_calls_break_down: {
        title: null,
        analysis_data: []
      },
      tabValue: 0,
      user_received_sms: [],
      user_sent_sms: [],
      user_incoming_call: [],
      minute: 0,
      user_conversation_timeline: {
        title: null,
        analysis_data: []
      },
      conv_timeline: [],
      conv_type: null
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
            const cbd_keys = Object.keys(cases['outgoing_calls_by_day']['analysis_data'][0]);
            const icbd_keys = Object.keys(cases['incoming_calls_by_day']['analysis_data'][0]);
            const cbc_keys = Object.keys(cases['calls_by_ctype']['analysis_data'][0]);
            const ssbd_keys = Object.keys(cases['sms_sent_by_day']['analysis_data'][0]);
            const srbd_keys = Object.keys(cases['sms_received_by_day']['analysis_data'][0]);
            const sbtd_keys = Object.keys(cases['sms_by_type_date']['analysis_data'][0]);

            var outgoing_calls_by_day = {...this.state.outgoing_calls_by_day}
            var incoming_calls_by_day = {...this.state.incoming_calls_by_day}
            var calls_by_ctype = {...this.state.calls_by_ctype}
            var sms_sent_by_day = {...this.state.sms_sent_by_day}
            var sms_received_by_day = {...this.state.sms_received_by_day}
            var sms_by_type_date = {...this.state.sms_by_type_date}
            var location_case = {...this.state.location_case}
            var user_conversation_timeline = {...this.state.user_conversation_timeline}
            var dashboard_case = {...this.state.dashboard}

            outgoing_calls_by_day.analysis_data = cases['outgoing_calls_by_day']['analysis_data']
            outgoing_calls_by_day.x_axis = cbd_keys[0]
            outgoing_calls_by_day.y_axis = cbd_keys[1]
            outgoing_calls_by_day.title = cases['outgoing_calls_by_day']['title']

            incoming_calls_by_day.analysis_data = cases['incoming_calls_by_day']['analysis_data']
            incoming_calls_by_day.x_axis = icbd_keys[0]
            incoming_calls_by_day.y_axis = icbd_keys[1]
            incoming_calls_by_day.title = cases['incoming_calls_by_day']['title']

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

            user_conversation_timeline.analysis_data = cases['conversation_timeline']['analysis_data']
            user_conversation_timeline.title = cases['conversation_timeline']['title']

            this.setState(
              {
                  outgoing_calls_by_day: outgoing_calls_by_day,
                  incoming_calls_by_day: incoming_calls_by_day,
                  calls_by_ctype: calls_by_ctype,
                  sms_sent_by_day: sms_sent_by_day,
                  sms_received_by_day: sms_received_by_day,
                  sms_by_type_date: sms_by_type_date,
                  location_case: location_case,
                  dashboard_case: dashboard_case,
                  user_conversation_timeline: user_conversation_timeline
              })
      })
  }
  handleChange = (event, newValue) => {
     this.setState({value:newValue})
  };

  tabHandleChange = (event, newValue) => {
     this.setState({tabValue:newValue})
  };

  handleFromDateChange = (date) => {
    this.setState({selectedFromDate:date})
  };

  handleToDateChange = (date) => {
    this.setState({selectedToDate:date})

    axios.get(
        `http://127.0.0.1:8000/v1/case/cases/location_analysis/`, {
          params: {
              caseId: this.props.location.state.id,
              dateFrom: this.state.selectedFromDate,
              dateTo: date
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
            const cases = response.data;
            var location_case = {...this.state.location_case}

            location_case.analysis_data = cases['location_case']['analysis_data']
            location_case.title = cases['location_case']['title']
            this.setState(
              {
                location_case: location_case
              })
        })
  };

  getReceivedSMS = (props) => {
    axios.get(
        `http://127.0.0.1:8000/v1/case/cases/get_received_sms/`, {
          params: {
              caseId: this.props.location.state.id,
              dateReceived: props._date_received,
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
            const cases = response.data;
            var r_sms_break_down = {...this.state.r_sms_break_down}

            r_sms_break_down.analysis_data = cases['received_sms']['analysis_data']
            r_sms_break_down.title = cases['received_sms']['title']
            this.setState(
              {
                r_sms_break_down: r_sms_break_down
              })
        })
  }

  getSentSMS = (props) => {
    axios.get(
        `http://127.0.0.1:8000/v1/case/cases/get_sent_sms/`, {
          params: {
              caseId: this.props.location.state.id,
              dateSent: props._comm_date,
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
            const cases = response.data;
            var s_sms_break_down = {...this.state.s_sms_break_down}

            s_sms_break_down.analysis_data = cases['sent_sms']['analysis_data']
            s_sms_break_down.title = cases['sent_sms']['title']
            this.setState(
              {
                s_sms_break_down: s_sms_break_down
              })
            console.log(s_sms_break_down)
        })
  }

  getIncomingCall = (props) => {
    axios.get(
        `http://127.0.0.1:8000/v1/case/cases/get_incoming_calls/`, {
          params: {
              caseId: this.props.location.state.id,
              dateCalled: props._date_called,
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
            const cases = response.data;
            var i_calls_break_down = {...this.state.i_calls_break_down}

            i_calls_break_down.analysis_data = cases['incoming_calls']['analysis_data']
            i_calls_break_down.title = cases['incoming_calls']['title']
            this.setState(
              {
                i_calls_break_down: i_calls_break_down
              })
            console.log(i_calls_break_down)
        })
  }

  onMarkerClick = (props, marker, e) => {
    var mydate = new Date(marker.timestamp);

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      title: marker.aplace,
      address: marker.address,
      timestamp: mydate.toString()
    });

    axios.get(
        `http://127.0.0.1:8000/v1/case/cases/marker_analysis/`, {
          params: {
              caseId: this.props.location.state.id,
              locationId: marker.id
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
            const cases = response.data;

            var location_timeline = {...this.state.location_timeline}
            location_timeline.analysis_data = cases['location_timeline']['analysis_data']
            this.setState({location_timeline: location_timeline})
        })
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
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
      const { value } = this.state;

      const Markers = props => (
        this.state.location_case.analysis_data.map(marker =>
          <Marker
            {...props}
            id={marker.id}
            address={marker.address}
            aplace={marker.place}
            timestamp={marker.timestamp}
            onClick={this.onMarkerClick}
            position={{lat: marker.lat, lng: marker.lng}}
           />)
      )

      const Sent = props => (
          this.state.location_timeline.analysis_data.messages.map((sms, index) =>
            <div className={classes.encloseSingleSent}>
                  { index >= 1 && <hr className={classes.hr}/>}
                  <div>
                    <div className={classes.sentTitle}>
                      { sms.date_sent? <span> To </span> : <span> From </span>}
                    </div>
                    <div className={classes.sentRecipient}>
                      {sms.recipient || sms.sender}
                    </div>
                  </div>
                  <div>
                    <div className={classes.sentTitle}> Date </div>
                    <div className={classes.dateSent}>
                      {sms.date_sent || sms.date_received}
                    </div>
                  </div>
            </div>
          )
        )

      const IncomingCalls = props => (
          this.state.location_timeline.analysis_data.incoming_calls.map((calls, index) =>
            <div className={classes.encloseSingleSent}>
                  { index >= 1 && <hr className={classes.hr}/>}
                  <div>
                    <div className={classes.sentTitle}>
                      { calls.ctype == 'outgoing' ? <span> To </span> : <span> From </span>}
                      </div>
                    <div className={classes.sentRecipient}>
                      { calls.ctype == 'outgoing' ? 'Subject' : calls.cfrom }
                      </div>
                  </div>
                  <div>
                    <div className={classes.sentTitle}> Date </div>
                    <div className={classes.dateSent}>{calls.date_called}</div>
                  </div>
            </div>
          )
        )

      const SentIcon = props => (
        <div>
          <MessageIcon fontSize="large" />
        </div>
      )

      const CallIcon = props => (
        <div>
          <PhoneOutlinedIcon fontSize="large" />
        </div>
      )

      const TabWrapper = props => (
        this.state.r_sms_break_down.analysis_data.map((sms, index) =>
          <Tab
            label={<><div><AccountCircleIcon style={{verticalAlign: 'middle'}}/> {sms['user']}</div></>}
            key={index}
            onChange= {() =>
              this.setState({user_received_sms: sms['sms']})
            }
            {...a11yPropsVertical(index)} />
        )
      )

      const TabWrapperIncomingCall = props => (
        this.state.i_calls_break_down.analysis_data.map((call, index) =>
          <Tab
            label={<><div><AccountCircleIcon style={{verticalAlign: 'middle'}}/> {call['user']}</div></>}
            key={index}
            onChange= {() =>
              this.setState({user_incoming_call: call['call']})
            }
            {...a11yPropsVertical(index)} />
        )
      )

      const TabPanelVerticalWrapperIncomingCall = props => (
            <TabPanelVertical
              key={this.state.tabValue}
              className={classes.tabPanelVerticalDiv}
              value={this.state.tabValue} index={this.state.tabValue}>

              {this.state.user_incoming_call.length == 0 ?
                  <div className={classes.noResult}>
                    Click conversation bar for breakdown
                    </div>: <span></span>
              }

              {this.state.user_incoming_call.map((call, index) =>
                  <div
                    key={btoa(Math.random()).substring(0,12)}
                    className={classes.smsDivWrapper}>
                    <div
                      key={btoa(Math.random()).substring(0,12)}
                      className={classes.smsDiv}>
                      <div key={btoa(Math.random()).substring(0,12)}>
                        <span key={btoa(Math.random()).substring(0,12)}>Country Code: </span>
                        <span key={btoa(Math.random()).substring(0,12)}>{call['country_code']}</span>
                      </div>
                      <div key={btoa(Math.random()).substring(0,12)}>
                        <span key={btoa(Math.random()).substring(0,12)}>Duration: </span>
                        <span key={btoa(Math.random()).substring(0,12)}>{call['cduration']}</span>
                      </div>
                      <div key={btoa(Math.random()).substring(0,12)}>
                      <span key={btoa(Math.random()).substring(0,12)}>Date:    </span>
                      <span key={btoa(Math.random()).substring(0,12)}>{call['date_called']}</span>
                      </div>
                    </div>
                  </div>
              )}
            </TabPanelVertical>
      )

      const TabWrapperSent = props => (
        this.state.s_sms_break_down.analysis_data.map((sms, index) =>
          <Tab
            label={<><div><AccountCircleIcon style={{verticalAlign: 'middle'}}/> {sms['user']}</div></>}
            key={index}
            onChange= {() =>
              this.setState({user_sent_sms: sms['sms']})
            }
            {...a11yPropsVertical(index)} />
        )
      )


      const TabWrapperConvTimeLine = props => (
          this.state.user_conversation_timeline.analysis_data.map((conv, index) =>
          <Tab
            label={<><div><AccountCircleIcon style={{verticalAlign: 'middle'}}/> {conv['user']}</div></>}
            key={index}
            onChange= {() =>
              this.setState({conv_timeline: conv['conv']})
            }
            {...a11yPropsVertical(index)} />
        )
      )

      const TabPanelVerticalWrapper = props => (
            <TabPanelVertical
              key={this.state.tabValue}
              className={classes.tabPanelVerticalDiv}
              value={this.state.tabValue} index={this.state.tabValue}>

              {this.state.user_received_sms.length == 0 ?
                  <div className={classes.noResult}>
                    Click conversation bar for breakdown
                    </div>: <span></span>
              }

              {this.state.user_received_sms.map((sms, index) =>
                  <div
                    key={btoa(Math.random()).substring(0,12)}
                    className={classes.smsDivWrapper}>
                    <div
                      key={btoa(Math.random()).substring(0,12)}
                      className={classes.smsDiv}>
                      {sms['body']}
                    </div>
                    <div
                      key={btoa(Math.random()).substring(0,12)}
                      className={classes.drDiv}>{sms['date_received']}</div>
                  </div>
              )}
            </TabPanelVertical>
      )

      const TabPanelVerticalSentWrapper = props => (
          <TabPanelVertical
            key={this.state.tabValue}
            className={classes.tabPanelVerticalDiv}
            value={this.state.tabValue} index={this.state.tabValue}>
          {this.state.user_sent_sms.length == 0 ?
              <div className={classes.noResult}>
                Click conversation bar for breakdown
                </div>: <span></span>
          }
          {this.state.user_sent_sms.map((sms, index) =>
              <div
                key={btoa(Math.random()).substring(0,12)}
                className={classes.smsDivWrapper}>
                <div
                  key={btoa(Math.random()).substring(0,12)}
                    className={classes.smsDiv}>
                  {sms['body']}
                </div>
                <div
                  key={btoa(Math.random()).substring(0,12)}
                  className={classes.drDiv}>{sms['date_sent']}</div>
              </div>
          )}
          </TabPanelVertical>
      )

      const SentDiv = props => (
        <div>
          <MessageIcon fontSize="large" />
        </div>
      )

      const TabPanelVerticalWrapperConvTimeLine = props => (
            <TabPanelVertical
              key={'key_' + this.state.tabValue}
              className={classes.tabPanelVerticalDiv}
              value={this.state.tabValue} index={this.state.tabValue}>

              {this.state.conv_timeline.length == 0 ?
                  <div className={classes.noResult}>
                    Click conversation contact for more Information
                    </div>: <span></span>
              }
              {this.state.conv_timeline.map((conv, index) =>
                <div key={btoa(Math.random()).substring(0,12)}>
                  <div
                    key={btoa(Math.random()).substring(0,12)}
                    className={
                      conv['type'] == 'sent'? classes.sent: conv['type'] == 'inbox'? classes.inbox : classes.incoming
                    }>
                    <div key={btoa(Math.random()).substring(0,12)}>
                      {conv['body']}
                    </div>
                    <br/>
                    <div key={btoa(Math.random()).substring(0,12)} className={classes.convLocation}>{conv['_location']}</div>
                    <div  key={btoa(Math.random()).substring(0,12)} className={classes.convDate}>
                    {conv['date']}
                    </div>
                  </div>

                </div>
              )}

            </TabPanelVertical>
      )


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
            <Tab label="Conversation TimeLine" {...this.a11yProps(0)} />
            <Tab label="Messages" {...this.a11yProps(1)} />
            <Tab label="Calls" {...this.a11yProps(2)} />
            <Tab label="Location" {...this.a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Paper className={classes.paper}>
                 <div>
                   <div className={classes.caseGrid}>
                     {this.state.r_sms_break_down.title || 'Conversation TimeLine'}
                     <hr className={classes.hr}/>
                   </div>
                 </div>
                <div className={classes.verticalTabConTimeLine}>
                   <Tabs
                     orientation="vertical"
                     variant="scrollable"
                     value={this.state.tabValue}
                     onChange={this.tabHandleChange}
                     aria-label="Vertical tabs example"
                     className={classes.tabs}
                   >
                    <TabWrapperConvTimeLine/>
                    </Tabs>
                    <TabPanelVerticalWrapperConvTimeLine/>
                  </div>
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
                     <Bar dataKey="sms_count"
                      fill="#8884d8" minPointSize={10}
                      name='SMS count' onClick={this.getReceivedSMS}/>
                   </BarChart>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                 <div>
                   <div className={classes.caseGrid}>
                     {this.state.r_sms_break_down.title || 'Received sms breakdown by contact person'}
                     <hr className={classes.hr}/>
                   </div>
                 </div>
                <div className={classes.verticalTab}>
                   <Tabs
                     orientation="vertical"
                     variant="scrollable"
                     value={this.state.tabValue}
                     onChange={this.tabHandleChange}
                     aria-label="Vertical tabs example"
                     className={classes.tabs}
                   >
                    <TabWrapper/>
                    </Tabs>
                    <TabPanelVerticalWrapper/>
                  </div>
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
                       <Bar
                        dataKey="sms_count"
                        fill="#82ca9d"
                        minPointSize={10}
                        name='SMS count'
                        onClick={this.getSentSMS}/>
                     </BarChart>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                 <div>
                   <div className={classes.caseGrid}>
                     {this.state.s_sms_break_down.title || 'Sent sms breakdown by contact person'}
                     <hr className={classes.hr}/>
                   </div>
                 </div>
                 <div className={classes.verticalTab}>
                    <Tabs
                      orientation="vertical"
                      variant="scrollable"
                      value={this.state.tabValue}
                      onChange={this.tabHandleChange}
                      aria-label="Vertical tabs example"
                      className={classes.tabs}
                    >
                     <TabWrapperSent/>
                     </Tabs>
                     <TabPanelVerticalSentWrapper/>
                   </div>
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
        <TabPanel value={value} index={2}>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                 <div>
                   <div className={classes.caseGrid}>
                     {this.state.incoming_calls_by_day.title}
                     <hr className={classes.hr}/>
                   </div>
                 </div>
                  <BarChart width={600} height={300} data={this.state.incoming_calls_by_day.analysis_data}
                         margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey={this.state.outgoing_calls_by_day.x_axis}>
                     <Label value="Day Of Call" offset={0} position="bottom" />
                   </XAxis>
                    <YAxis label={{ value: 'No. Of Calls', angle: -90, position: 'insideBottomLeft', textAnchor: 'middle' }}/>
                    <Tooltip/>
                    <Legend />
                     <Bar
                      dataKey="call_count"
                      fill="#82ca9d"
                      minPointSize={10}
                      name='Call count'
                      onClick={this.getIncomingCall}/>
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
                  <div className={classes.verticalTab}>
                     <Tabs
                       orientation="vertical"
                       variant="scrollable"
                       value={this.state.tabValue}
                       onChange={this.tabHandleChange}
                       aria-label="Vertical tabs example"
                       className={classes.tabs}
                     >
                      <TabWrapperIncomingCall/>
                      </Tabs>
                      <TabPanelVerticalWrapperIncomingCall/>
                    </div>
                </Paper>
             </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                 <div>
                   <div className={classes.caseGrid}>
                     {this.state.outgoing_calls_by_day.title}
                     <hr className={classes.hr}/>
                   </div>
                 </div>
                  <BarChart width={600} height={300} data={this.state.outgoing_calls_by_day.analysis_data}
                         margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey={this.state.outgoing_calls_by_day.x_axis}>
                     <Label value="Day Of Call" offset={0} position="bottom" />
                   </XAxis>
                    <YAxis label={{ value: 'No. Of Calls', angle: -90, position: 'insideBottomLeft', textAnchor: 'middle' }}/>
                    <Tooltip/>
                    <Legend />
                     <Bar
                      dataKey="call_count"
                      fill="#82ca9d"
                      minPointSize={10}
                      name='Call count'
                      />
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
        <TabPanel value={value} index={3}>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={8}>
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
                       id="date-picker-to"
                       label="To"
                       value={this.state.selectedToDate}
                       onChange={this.handleToDateChange}
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
                       id="date-picker-from"
                       label="From"
                       value={this.state.selectedFromDate}
                       onChange={this.handleFromDateChange}
                       KeyboardButtonProps={{
                         'aria-label': 'change date',
                       }}/>
                     </div>
                   </MuiPickersUtilsProvider>
                   <div className={classes.minDev}>
                   <FormControl>
                       <InputLabel htmlFor="minutes">Deviation in Minutes</InputLabel>
                       <Input id="minutes"
                        value={this.minute}
                        type="number"
                        defaultValue='0'
                        onChange={this.handleMinuteChange} />
                     </FormControl>
                   </div>
                 </div>
                 <div className={classes.maps}>
                 <Map
                     google={this.props.google}
                     onClick={this.onMapClicked}
                     initialCenter={{
                         lat: 38.8810628,
                         lng: -77.11394929,
                     }}
                     zoom={10}
                     style={style}
                     containerStyle={containerStyle}>
                        <Markers/>
                        <InfoWindow
                           marker={this.state.activeMarker}
                           visible={this.state.showingInfoWindow}>
                             <div>
                               <p>{this.state.title}</p>
                             </div>
                         </InfoWindow>
                   </Map>
                   </div>
                </Paper>
              </Grid>
              <Grid item xs={4}>
              <Paper className={classes.paper}>
                <div>
                  <div className={classes.caseGrid}>
                    Case Timeline
                    <hr className={classes.hr}/>
                    <div>
                      <p className={classes.locationTitle}> Place Name</p>
                      <p className={classes.locationBTitle}>
                        {this.state.title ? this.state.title: '-'}
                      </p>
                    </div>
                    <div>
                      <p className={classes.locationTitle}> Place Address</p>
                      <p className={classes.locationBTitle}>
                        {this.state.address ? this.state.address: '-'}
                      </p>
                    </div>
                    <div>
                      <p className={classes.locationTitle}> Date</p>
                      <p className={classes.locationBTitle}>
                        {this.state.timestamp ? this.state.timestamp: '-'}
                      </p>
                    </div>
                    <div className={classes.encloseSent}>
                      { this.state.location_timeline.analysis_data.messages.length > 0 ?
                          <SentIcon/> : <span></span>
                      }

                      {
                          this.state.location_timeline.analysis_data.messages.length >0  &&
                          <div className={classes.sentMsg}>
                            <Sent/>
                          </div>
                      }
                    </div>

                    <div className={classes.encloseSent}>
                      { this.state.location_timeline.analysis_data.messages.length > 0 ?
                          <CallIcon/> : <span></span>
                      }

                      {
                          this.state.location_timeline.analysis_data.incoming_calls.length >0  &&
                          <div className={classes.sentMsg}>
                            <IncomingCalls/>
                          </div>
                      }
                    </div>
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
