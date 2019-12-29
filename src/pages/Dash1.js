import React, { Component } from "react";
<<<<<<< HEAD
import {
  getOneDashboard,
  getCharts,
  getAllDashboards
} from "../utils/APIUtils";
import Charts from "../components/Chart";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

//Material ui grid styling
const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(5)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary
  }
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      charts: "",
      dashId: "",
      isLoading: false,
      singleDashboard: "",
      dashboards: "",
      dataElements: "",
      organisationUnits: ""
    };
  }
  componentDidMount() {
    getCharts().then(data => {
      this.setState({ charts: data.charts });
    });
    getAllDashboards().then(data => {
      this.setState({ dashboards: data.dashboards });
    });
    //getOneDashboard(this.state.dashId).then(data => { this.setState({ singleDashboard: data }) })
  }

  render() {
    const { classes } = this.props; //material ui class definition
    const { charts, dashboards, singleDashboard } = this.state;

    if (!charts || !dashboards) {
      return <div>Loading....</div>;
    }
    const chartsId = dashboards.map(ids => ids.id);
    console.log(chartsId);
    const dataPoints = [
      { x: 0, y: 25 },
      { x: 1, y: 27 },
      { x: 2, y: 428 },
      { x: 3, y: 324 },
      { x: 4, y: 35 },
      { x: 5, y: 339 },
      { x: 6, y: 4 },
      { x: 7, y: 525 },
      { x: 8, y: 323 },
      { x: 9, y: 420 },
      { x: 10, y: 37 },
      { x: 11, y: 384 }
    ];

    return (
      <div>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Charts
                  title={dashboards[3].displayName}
                  type={"spline"}
                  data={dataPoints}
                />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Charts title={"HIV"} type={"bar"} data={dataPoints} />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Charts
                  title={"IMMUNISATION"}
                  type={"scatter"}
                  data={dataPoints}
                />
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Charts title={"EBOLA"} type={"area"} data={dataPoints} />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Charts
                  title={"CHOLERA"}
                  type={"waterfall"}
                  data={dataPoints}
                />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Charts title={"TB"} type={"line"} data={dataPoints} />
              </Paper>
            </Grid>
          </Grid>
        </div>
=======

class Dash1 extends Component {
  render(props) {
    return (
      <div>
        <div>{this.props.children}</div>
>>>>>>> master
      </div>
    );
  }
}
<<<<<<< HEAD
export default withStyles(styles)(Home);
=======

export default Dash1;
>>>>>>> master
