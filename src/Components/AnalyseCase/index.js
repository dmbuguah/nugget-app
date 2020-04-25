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
      }
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

            var calls_by_day = {...this.state.calls_by_day}
            var calls_by_ctype = {...this.state.calls_by_ctype}

            calls_by_day.analysis_data = cases['calls_by_day']['analysis_data']
            calls_by_day.x_axis = cbd_keys[0]
            calls_by_day.y_axis = cbd_keys[1]

            calls_by_ctype.analysis_data = cases['calls_by_ctype']['analysis_data']
            calls_by_ctype.x_axis = cbc_keys[0]
            calls_by_ctype.y_axis = cbc_keys[1]


            this.setState(
              {
                  calls_by_day: calls_by_day,
                  calls_by_ctype: calls_by_ctype
              })

            console.log(this.state.calls_by_day.x_axis)

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
                 <BarChart width={600} height={300} data={this.state.calls_by_ctype.analysis_data}
                      margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                 <CartesianGrid strokeDasharray="3 3"/>
                 <XAxis dataKey="_call_date"/>
                 <YAxis/>
                 <Tooltip/>
                 <Legend />
                 <Bar dataKey="incoming" stackId="a" fill="#8884d8" />
                 <Bar dataKey="outgoing" stackId="a" fill="#82ca9d" />
                </BarChart>
               </Paper>
               </Grid>

               <Grid item xs={6}>
                 <Paper className={classes.paper}>
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
                   <LineChart width={600} height={300} data={data}
                         margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                   </LineChart>
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
