import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Dash1 from "./pages/Dash1";
import Dashboards from "./pages/Dashboards";
import NavBar from "./components/NavBar.js";
import Charts from "./components/Chart";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import {
  getAllDashboards,
  getCharts,
  oneChart,
  getData,
  request
} from "./utils/APIUtils";
import { BASE_URL } from "./constants/Constants";

//Material ui grid styling
const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 5
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary
  }
});

// App component
class App extends Component {
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
    oneChart().then(data => {
      this.setState({ dashId: data });
    });
  }

  render() {
    const { classes } = this.props; //material ui class definition

    const { charts, dashboards, dashId } = this.state;

    if (!charts || !dashboards) {
      return <div>Loading....</div>;
    }
    console.log(dashboards);

    const dashboardOneItems = dashboards[1].dashboardItems;
    const itemsIds = [];

    for (let i = 0; i < dashboardOneItems.length; i++) {
      if (dashboardOneItems[i].chart) {
        itemsIds.push(dashboardOneItems[i].chart);
      }
    }
    console.log(dashboardOneItems);
    console.log(itemsIds);

    let requiredCharts = [];

    charts.forEach(chart => {
      if (itemsIds.find(keys2 => keys2.id === chart.id)) {
        requiredCharts.push(chart);
      }
    });

    //prepare chart One
    const chartOneMetadata = requiredCharts[6];
    console.log(chartOneMetadata);

    const chartOneName = chartOneMetadata.displayName;
    const chartOneType = chartOneMetadata.type.toLowerCase();
    const orgFilter = chartOneMetadata.series;
    const periodFilter = chartOneMetadata.category;
    const periods = "LAST_12_MONTHS";
    const dataDimension = chartOneMetadata.dataDimensionItems[0].dataElement.id;
    const orgUnits = chartOneMetadata.organisationUnits.map(ids => ids.id);

    const dataValues = request({
      url:
        BASE_URL +
        `/analytics.json?dimension=dx:${dataDimension};&dimension=ou:${orgUnits[0]};${orgUnits[1]};${orgUnits[2]};${orgUnits[3]};${orgUnits[4]}&dimension=pe:${periods}`,
      method: "GET"
    }).then(data => {
      console.log(data);
    });

    // const dimensionOne = chartOneMetadata.filterDimension;

    // const rows = dashId.rows;
    // const columns = dashId.metadata;

    // const single = request({
    //   url: BASE_URL,
    //   method: 'GET'
    // }).then(data => JSON.stringify(data))
    // const value = parseFloat(rows[0][2])
    // // const value2 = rows[0][2]
    // const value3 = rows[0][2]

    // requiredCharts[0].
    console.log(chartOneMetadata);
    const dataPoints = [
      { label: "JAN", y: 104 },
      { label: "FEB", y: 27 },
      { label: "MARCH", y: 428 },
      { label: "APLIR", y: 324 },
      { label: "MAY", y: 35 },
      { label: "JUNE", y: 339 },
      { label: "JULY", y: 4 },
      { label: "AUGU", y: 525 },
      { label: "SEP", y: 323 },
      { label: "OCT", y: 420 },
      { label: "NOV", y: 37 },
      { label: "DEC", y: 900 }
    ];

    const chartOne = () => {
      return (
        <Charts type={chartOneType} title={chartOneName} data={dataPoints} />
      );
    };
    const chartTwo = () => {
      return <Charts type={"bar"} title={"hiv fact"} data={dataPoints} />;
    };
    return (
      <div className="App">
        <NavBar
          dash1={dashboards[3].displayName}
          dash2={dashboards[6].displayName}
          dash3={dashboards[0].displayName}
          dash4={dashboards[1].displayName}
        />

        <Switch>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs>
                <Paper className={classes.paper}>
                  {" "}
                  <Route
                    exact
                    path="/"
                    component={() => <Dash1>{chartOne()}</Dash1>}
                  />
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className={classes.paper}>
                  {" "}
                  <Route
                    exact
                    path="/"
                    component={() => <Dash1>{chartTwo()}</Dash1>}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>
          <Route exact path="/dash2" component={Dashboards} />
          <Route exact path="/dash3" component={Dashboards} />
          <Route exact path="/dash4" component={Dashboards} />
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(App);
