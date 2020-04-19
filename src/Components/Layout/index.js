import React, { Component, Fragment } from 'react'
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from 'react-router-dom'
import { MenuList, MenuItem } from '@material-ui/core'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#3d4977"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: "#f4f5fd",
    fontSize: "1rem",
    fontFamily: "Roboto",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.00938em",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  menuLink: {
    fontWeight: "normal",
  }
});


class Layout extends Component {
  render() {
    const { classes, location: { pathname }, children } = this.props

    return <Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Nugget App
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <MenuList>
            <MenuItem component={Link} to="/" selected={'/' === pathname} className={classes.menuLink}>
              Create Case
            </MenuItem>
            <MenuItem component={Link} to="/list-cases" selected={'/list-cases' === pathname} className={classes.menuLink}>
              List Cases
            </MenuItem>
          </MenuList>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
      </Fragment>
  }
}
export default compose(
  withRouter,
  withStyles(styles)
)(Layout)
