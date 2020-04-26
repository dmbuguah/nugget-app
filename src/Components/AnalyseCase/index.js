import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, Label} from 'recharts';
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import {withRouter } from 'react-router-dom'

import axios from 'axios';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  caseGrid: {
    padding: "4px",
    marginLeft: "14px",
    fontSize: "1.2rem",
    fontWeight: "400"
  },
  hr : {
    border: "0.6px solid #ddd",
  }
})

class AnalyseCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      casesId: null,
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
    }
  }

  // console.log(this.props.location.state.id)

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

            this.setState(
              {
                  calls_by_day: calls_by_day,
                  calls_by_ctype: calls_by_ctype,
                  sms_sent_by_day: sms_sent_by_day,
                  sms_received_by_day: sms_received_by_day,
                  sms_by_type_date: sms_by_type_date
              })

            console.log(cases)

      })
  }

  render() {
      const { classes } = this.props

      const data = [
            {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
            {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
            {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
            {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
            {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
            {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
            {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      ];

      return (
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
                      <Label value="Day Of Call" offset={0} position="insideBottom" />
                    </XAxis>
                     <YAxis label={{ value: 'No. Of Calls', angle: -90, position: 'insideLeft', textAnchor: 'middle' }}/>
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
                  <Label value="Day Of Call" offset={0} position="insideBottom" />
                </XAxis>
                 <YAxis label={{ value: 'No. Of Calls', angle: -90, position: 'insideLeft', textAnchor: 'middle' }}/>
                 <Tooltip/>
                 <Legend />
                 <Bar dataKey="incoming" stackId="a" fill="#8884d8" />
                 <Bar dataKey="outgoing" stackId="a" fill="#82ca9d" />
                </BarChart>
               </Paper>
               </Grid>

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
                      <Label value="Day of contact" offset={0} position="insideBottom" />
                    </XAxis>
                     <YAxis label={{ value: 'No. Of SMS received', angle: -90, position: 'insideLeft', textAnchor: 'middle' }}/>
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
                      {this.state.sms_sent_by_day.title}
                      <hr className={classes.hr}/>
                    </div>
                  </div>
                   <BarChart width={600} height={300} data={this.state.sms_sent_by_day.analysis_data}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                     <CartesianGrid strokeDasharray="3 3"/>
                     <XAxis dataKey={this.state.sms_sent_by_day.x_axis}>
                      <Label value="Day of contact" offset={0} position="insideBottom" />
                    </XAxis>
                     <YAxis label={{ value: 'No. Of SMS sent', angle: -90, position: 'insideLeft', textAnchor: 'middle' }}/>
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
                    <Label value="SMS date" offset={0} position="insideBottom" />
                  </XAxis>
                   <YAxis label={{ value: 'No. Of SMS', angle: -90, position: 'insideLeft', textAnchor: 'middle' }}/>
                   <Tooltip/>
                   <Legend />
                   <Bar dataKey="inbox" stackId="a" fill="#8884d8" />
                   <Bar dataKey="sent" stackId="a" fill="#82ca9d" />
                   <Bar dataKey="outbox" stackId="a" fill="#899a9d" />
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
                      <Label value="Day of contact" offset={0} position="insideBottom" />
                    </XAxis>
                     <YAxis label={{ value: 'No. Of SMS sent', angle: -90, position: 'insideLeft', textAnchor: 'middle' }}/>
                     <Tooltip/>
                     <Legend />
                      <Bar dataKey="sms_count" fill="#82ca9d" minPointSize={10} name='SMS count'/>
                    </BarChart>
                 </Paper>
               </Grid>
             </Grid>
            </div>
      )
  }
}

export default compose(
  withRouter,
  withStyles(styles)
) (AnalyseCase)
