import React, { Component, forwardRef } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MaterialTable from "material-table";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { compose } from 'recompose'
import { Redirect, withRouter } from 'react-router-dom'


import axios from 'axios';


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
  }
});

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


class ListCases extends Component {
  constructor(props) {
    super(props);
    localStorage.clear()
    this.state = {
      cases: [],
      rows: [],
      navigate: false,
      caseId: null
    }
  }

  componentDidMount() {
    axios.get(
        'http://127.0.0.1:8000/v1/case/cases/', {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
            const cases = response.data.results;
            this.setState({ cases });
      })
  }

  renderTableHeader() {
    let header = ['#', 'Title', 'Description', 'Platform', 'Extracts']
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }
  renderTableData() {
      return this.state.cases.map((cases, index) => {
         const { id, title, description, platforms, extracts } = cases
         return (
            <tr key={id}>
                <td>{index +1 }</td>
               <td>{title}</td>
               <td>{description}</td>
               <td>{platforms}</td>
               <td>{extracts}</td>
            </tr>
         )
      })
   }

   caseDitail() {

   }

  render() {
      const { navigate, caseId } = this.state
      if (navigate) {
         return <Redirect
           to={{
                pathname: "/analyse-case",
                state: { id: 'id' }
              }}
          />
      }
      return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          icons={tableIcons}
          columns={[
            { title: "Title", field: "title" },
            { title: "Description", field: "description" },
            { title: "Platform", field: "platforms"},
            { title: "Extracts", field: "extracts",
            }
          ]}
          data={this.state.cases}
          title="Cases under investigation"
          actions={[
            {
              icon: AssessmentIcon,
              tooltip: 'View analysis',
              onClick: (event, rowData) => this.setState({ navigate: true })
              // {this.caseDitail}
              // this.setState({ navigate: true })
              // {
              //     console.log(rowData)
              //     return <Redirect to='/analyse-case' />
              // }
            }
          ]}
          options={{
            actionsColumnIndex: -1
          }}
        />
      </div>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(ListCases)
