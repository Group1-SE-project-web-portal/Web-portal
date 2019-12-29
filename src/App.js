import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Dash1 from './pages/Dash1'
import Dashboards from './pages/Dashboards'
import NavBar from './components/NavBar.js'
import Charts from './components/Chart'
import $ from 'jquery';
import { Row, Container, Col } from 'reactstrap'


import { getAllDashboards, getCharts, getOrganisationUnits } from './utils/APIUtils'
import { BASE_URL, USERNAME, PASSWORD } from './constants/Constants';

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

    getCharts().then(data => { this.setState({ charts: data.charts }) })
    getAllDashboards().then(data => { this.setState({ dashboards: data.dashboards }) })
    getOrganisationUnits().then(data => { this.setState({ organisationUnits: data.organisationUnits }) })

  }

  //create chart one
  chartOne = () => {
    const { charts, dashboards, organisationUnits } = this.state

    if (!charts || !dashboards || !organisationUnits) {
      return <div>Loading....</div>
    }


    const dashboardOneItems = dashboards[0].dashboardItems;
    const itemsIds = [];

    for (let i = 0; i < dashboardOneItems.length; i++) {
      if (dashboardOneItems[i].chart) {
        itemsIds.push(dashboardOneItems[i].chart);
      }
    }

    let requiredCharts = [];

    charts.forEach(chart => {
      if (itemsIds.find(keys2 => keys2.id === chart.id)) {
        requiredCharts.push(chart);
      }
    });

    //prepare chart One
    const chartOneMetadata = requiredCharts[6];

    const chartOneName = chartOneMetadata.displayName
    const periods = 'LAST_12_MONTHS'
    const dataDimension = chartOneMetadata.dataDimensionItems[0].dataElement.id
    const orgUnits = chartOneMetadata.organisationUnits.map(ids => ids.id)

    //get values
    var dataValues = $.ajax({
      url: BASE_URL + `/analytics.json?dimension=dx:${dataDimension};&dimension=ou:${orgUnits[0]};${orgUnits[1]};${orgUnits[2]};${orgUnits[3]};${orgUnits[4]}&dimension=pe:${periods}`,
      dataType: "json",
      headers: { "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD) },
      success: function (data) { },
      async: false,
      error: function (err) {
        console.log(err);
      }
    }).responseJSON;

    const orgIds = dataValues.metaData.dimensions.ou

    //get org display names
    const OrgUnitsDispNames = []
    organisationUnits.forEach(org => {
      orgIds.forEach(id => {
        if (org.id === id) {
          OrgUnitsDispNames.push(org.displayName)
        }
      })
    })

    //get actaull data
    const actualData = dataValues.rows

    //create an array of objects that stores the values in order
    let orgData = [{
      id: '',
      values: [],
      periods: []
    }]

    let id = [], value = [], period = []

    for (let i = 0; i < actualData.length; i++) {

      if (actualData[i][1] === orgIds[0]) {
        id = OrgUnitsDispNames[0]
        value.push(parseFloat(actualData[i][3]))
        period.push(actualData[i][2])

      }

    }
    orgData.push({ id, value, period })

    let id1 = [], value1 = [], period1 = []

    for (let i = 0; i < actualData.length; i++) {
      if (actualData[i][1] === orgIds[1]) {
        id1 = OrgUnitsDispNames[1]
        value1.push(parseFloat(actualData[i][3]))
        period1.push(actualData[i][2])
      }
    }
    orgData.push({ id1, value1, period1 })


    let id2 = [], value2 = [], period2 = []

    for (let i = 0; i < actualData.length; i++) {
      if (actualData[i][1] === orgIds[2]) {
        id2 = OrgUnitsDispNames[3]
        value2.push(parseFloat(actualData[i][3]))
        period2.push(actualData[i][2])
      }
    }
    orgData.push({ id2, value2, period2 })


    let id3 = [], value3 = [], period3 = []

    for (let i = 0; i < actualData.length; i++) {
      if (actualData[i][1] === orgIds[3]) {
        id3 = OrgUnitsDispNames[2]
        value3.push(parseFloat(actualData[i][3]))
        period3.push(actualData[i][2])
      }
    }
    orgData.push({ id3, value3, period3 })


    let id4 = [], value4 = [], period4 = []

    for (let i = 0; i < actualData.length; i++) {
      if (actualData[i][1] === orgIds[4]) {
        id4 = OrgUnitsDispNames[4]
        value4.push(parseFloat(actualData[i][3]))
        period4.push(actualData[i][2])
      }
    }
    orgData.push({ id4, value4, period4 })

    //prepare chart one data
    const dataPoints = [{
      type: "bar",
      showInLegend: true,
      legendText: orgData[1].id,
      dataPoints: [
        { y: orgData[1].value[0], label: "December 2018" },
        { y: orgData[1].value[1], label: "October 2019" },
        { y: orgData[1].value[2], label: "November 2019" },
        { y: orgData[1].value[3], label: "June 2019" },
        { y: orgData[1].value[4], label: "July 2019" },
        { y: orgData[1].value[5], label: "August 2019" },
        { y: orgData[1].value[6], label: "September 2019" },
        { y: orgData[1].value[7], label: "February 2019" },
        { y: orgData[1].value[8], label: "March 2019" },
        { y: orgData[1].value[9], label: "April 2019" },
        { y: orgData[1].value[10], label: "May 2019" },
        { y: orgData[1].value[11], label: "January 2019" }

      ]
    },
    {
      type: "bar",
      showInLegend: true,
      legendText: orgData[2].id1,
      dataPoints: [
        { y: orgData[2].value1[0], label: "December 2018" },
        { y: orgData[2].value1[1], label: "February 2019" },
        { y: orgData[2].value1[2], label: "March 2019" },
        { y: orgData[2].value1[3], label: "January 2019" },
        { y: orgData[2].value1[4], label: "August 2019" },
        { y: orgData[2].value1[5], label: "September 2019" },
        { y: orgData[2].value1[6], label: "June 2019" },
        { y: orgData[2].value1[7], label: "July 2019" },
        { y: orgData[2].value1[8], label: "April 2019" },
        { y: orgData[2].value1[9], label: "May 2019" },
        { y: orgData[2].value1[10], label: "November 2019" },
        { y: orgData[2].value1[11], label: "October 2019" }

      ]
    }
      ,
    {
      type: "bar",
      showInLegend: true,
      legendText: orgData[3].id2,
      dataPoints: [
        { y: orgData[3].value2[0], label: "December 2018" },
        { y: orgData[3].value2[1], label: "February 2019" },
        { y: orgData[3].value2[2], label: "March 2019" },
        { y: orgData[3].value2[3], label: "January 2019" },
        { y: orgData[3].value2[4], label: "August 2019" },
        { y: orgData[3].value2[5], label: "September 2019" },
        { y: orgData[3].value2[6], label: "June 2019" },
        { y: orgData[3].value2[7], label: "July 2019" },
        { y: orgData[3].value2[8], label: "April 2019" },
        { y: orgData[3].value2[9], label: "May 2019" },
        { y: orgData[3].value2[10], label: "November 2019" },
        { y: orgData[3].value2[11], label: "October 2019" }

      ]
    }
      ,
    {
      type: "bar",
      showInLegend: true,
      legendText: orgData[4].id3,
      dataPoints: [
        { y: orgData[4].value3[0], label: "December 2018" },
        { y: orgData[4].value3[1], label: "February 2019" },
        { y: orgData[4].value3[2], label: "March 2019" },
        { y: orgData[4].value3[3], label: "January 2019" },
        { y: orgData[4].value3[4], label: "August 2019" },
        { y: orgData[4].value3[5], label: "September 2019" },
        { y: orgData[4].value3[6], label: "June 2019" },
        { y: orgData[4].value3[7], label: "July 2019" },
        { y: orgData[4].value3[8], label: "April 2019" },
        { y: orgData[4].value3[9], label: "May 2019" },
        { y: orgData[4].value3[10], label: "November 2019" },
        { y: orgData[4].value3[11], label: "October 2019" }

      ]
    }
      ,
    {
      type: "bar",
      showInLegend: true,
      legendText: orgData[5].id4,
      dataPoints: [
        { y: orgData[5].value4[0], label: "December 2018" },
        { y: orgData[5].value4[1], label: "February 2019" },
        { y: orgData[5].value4[2], label: "March 2019" },
        { y: orgData[5].value4[3], label: "January 2019" },
        { y: orgData[5].value4[4], label: "August 2019" },
        { y: orgData[5].value4[5], label: "September 2019" },
        { y: orgData[5].value4[6], label: "June 2019" },
        { y: orgData[5].value4[7], label: "July 2019" },
        { y: orgData[5].value4[8], label: "April 2019" },
        { y: orgData[5].value4[9], label: "May 2019" },
        { y: orgData[5].value4[10], label: "November 2019" },
        { y: orgData[5].value4[11], label: "October 2019" }

      ]
    }

    ]
    return <Charts type={"bar"} title={chartOneName} data={dataPoints} />
  }



  //create chart one
  chartTwo = () => {
    const { charts, dashboards, organisationUnits } = this.state

    if (!charts || !dashboards || !organisationUnits) {
      return <div>Loading....</div>
    }


    const dashboardOneItems = dashboards[0].dashboardItems;
    const itemsIds = [];

    for (let i = 0; i < dashboardOneItems.length; i++) {
      if (dashboardOneItems[i].chart) {
        itemsIds.push(dashboardOneItems[i].chart);
      }
    }

    let requiredCharts = [];

    charts.forEach(chart => {
      if (itemsIds.find(keys2 => keys2.id === chart.id)) {
        requiredCharts.push(chart);
      }
    });


    //prepare chart One
    const chartTwoMetadata = requiredCharts[7];

    const chartTwoName = chartTwoMetadata.displayName
    const periods = 'LAST_12_MONTHS'
    const dataDimension = chartTwoMetadata.dataDimensionItems[0].indicator.id
    const orgUnits = chartTwoMetadata.organisationUnits.map(ids => ids.id)

    //get values
    var dataValues = $.ajax({
      url: BASE_URL + `/analytics.json?dimension=dx:${dataDimension};&dimension=ou:${orgUnits[0]};${orgUnits[1]};${orgUnits[2]};${orgUnits[3]};${orgUnits[4]}&dimension=pe:${periods}`,
      dataType: "json",
      headers: { "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD) },
      success: function (data) { },
      async: false,
      error: function (err) {
        console.log(err);
      }
    }).responseJSON;


    const orgIds = dataValues.metaData.dimensions.ou


    // //get org display names
    const OrgUnitsDispNames = []
    organisationUnits.forEach(org => {
      orgIds.forEach(id => {
        if (org.id === id) {
          OrgUnitsDispNames.push(org.displayName)
        }
      })
    })

    // // //get actaull data
    const actualData = dataValues.rows

    //create an array of objects that stores the values in order
    let orgData = [{
      id: '',
      values: [],
      periods: []
    }]

    let id = [], value = [], period = []



    for (let i = 0; i < actualData.length; i++) {

      if (actualData[i][1] === orgIds[0]) {
        id = OrgUnitsDispNames[0]
        value.push(parseFloat(actualData[i][3]))
        period.push(actualData[i][2])

      }

    }
    orgData.push({ id, value, period })

    let id1 = [], value1 = [], period1 = []

    for (let i = 0; i < actualData.length; i++) {
      if (actualData[i][1] === orgIds[1]) {
        id1 = OrgUnitsDispNames[1]
        value1.push(parseFloat(actualData[i][3]))
        period1.push(actualData[i][2])
      }
    }
    orgData.push({ id1, value1, period1 })


    let id2 = [], value2 = [], period2 = []

    for (let i = 0; i < actualData.length; i++) {
      if (actualData[i][1] === orgIds[2]) {
        id2 = OrgUnitsDispNames[3]
        value2.push(parseFloat(actualData[i][3]))
        period2.push(actualData[i][2])
      }
    }
    orgData.push({ id2, value2, period2 })


    let id3 = [], value3 = [], period3 = []

    for (let i = 0; i < actualData.length; i++) {
      if (actualData[i][1] === orgIds[3]) {
        id3 = OrgUnitsDispNames[2]
        value3.push(parseFloat(actualData[i][3]))
        period3.push(actualData[i][2])
      }
    }
    orgData.push({ id3, value3, period3 })


    let id4 = [], value4 = [], period4 = []

    for (let i = 0; i < actualData.length; i++) {
      if (actualData[i][1] === orgIds[4]) {
        id4 = OrgUnitsDispNames[4]
        value4.push(parseFloat(actualData[i][3]))
        period4.push(actualData[i][2])
      }
    }
    orgData.push({ id4, value4, period4 })


    // //prepare chart one data
    const dataPoints = [{
      type: "bar",
      showInLegend: true,
      legendText: orgData[1].id,
      dataPoints: [
        { y: orgData[1].value[0], label: "December 2018" },
        { y: orgData[1].value[1], label: "January 2019" },
        { y: orgData[1].value[2], label: "February 2019" },
        { y: orgData[1].value[3], label: "March 2019" },
        { y: orgData[1].value[4], label: "April 2019" },
        { y: orgData[1].value[5], label: "May 2019" },
        { y: orgData[1].value[6], label: "June 2019" },
        { y: orgData[1].value[7], label: "July 2019" },
        { y: orgData[1].value[8], label: "August 2019" },
        { y: orgData[1].value[9], label: "September 2019" },
        { y: orgData[1].value[10], label: "October 2019" },
        { y: orgData[1].value[11], label: "November 2019" }

      ]
    },
    {
      type: "bar",
      showInLegend: true,
      legendText: orgData[2].id1,
      dataPoints: [
        { y: orgData[2].value1[0], label: "December 2018" },
        { y: orgData[2].value1[1], label: "January 2019" },
        { y: orgData[2].value1[2], label: "February 2019" },
        { y: orgData[2].value1[3], label: "March 2019" },
        { y: orgData[2].value1[4], label: "April 2019" },
        { y: orgData[2].value1[5], label: "May 2019" },
        { y: orgData[2].value1[6], label: "June 2019" },
        { y: orgData[2].value1[7], label: "July 2019" },
        { y: orgData[2].value1[8], label: "August 2019" },
        { y: orgData[2].value1[9], label: "September 2019" },
        { y: orgData[2].value1[10], label: "October 2019" },
        { y: orgData[2].value1[11], label: "November 2019" }

      ]
    }
      ,
    {
      type: "bar",
      showInLegend: true,
      legendText: orgData[3].id2,
      dataPoints: [
        { y: orgData[3].value2[0], label: "December 2018" },
        { y: orgData[3].value2[1], label: "January 2019" },
        { y: orgData[3].value2[2], label: "February 2019" },
        { y: orgData[3].value2[3], label: "March 2019" },
        { y: orgData[3].value2[4], label: "April 2019" },
        { y: orgData[3].value2[5], label: "May 2019" },
        { y: orgData[3].value2[6], label: "June 2019" },
        { y: orgData[3].value2[7], label: "July 2019" },
        { y: orgData[3].value2[8], label: "August 2019" },
        { y: orgData[3].value2[9], label: "September 2019" },
        { y: orgData[3].value2[10], label: "October 2019" },
        { y: orgData[3].value2[11], label: "November 2019" }

      ]
    }
      ,
    {
      type: "bar",
      showInLegend: true,
      legendText: orgData[4].id3,
      dataPoints: [
        { y: orgData[4].value3[0], label: "December 2018" },
        { y: orgData[4].value3[1], label: "January 2019" },
        { y: orgData[4].value3[2], label: "February 2019" },
        { y: orgData[4].value3[3], label: "March 2019" },
        { y: orgData[4].value3[4], label: "April 2019" },
        { y: orgData[4].value3[5], label: "May 2019" },
        { y: orgData[4].value3[6], label: "June 2019" },
        { y: orgData[4].value3[7], label: "July 2019" },
        { y: orgData[4].value3[8], label: "August 2019" },
        { y: orgData[4].value3[9], label: "September 2019" },
        { y: orgData[4].value3[10], label: "October 2019" },
        { y: orgData[4].value3[11], label: "November 2019" }

      ]
    }
      ,
    {
      type: "bar",
      showInLegend: true,
      legendText: orgData[5].id4,
      dataPoints: [
        { y: orgData[5].value4[0], label: "December 2018" },
        { y: orgData[5].value4[1], label: "January 2019" },
        { y: orgData[5].value4[2], label: "February 2019" },
        { y: orgData[5].value4[3], label: "March 2019" },
        { y: orgData[5].value4[4], label: "April 2019" },
        { y: orgData[5].value4[5], label: "May 2019" },
        { y: orgData[5].value4[6], label: "June 2019" },
        { y: orgData[5].value4[7], label: "July 2019" },
        { y: orgData[5].value4[8], label: "August 2019" },
        { y: orgData[5].value4[9], label: "September 2019" },
        { y: orgData[5].value4[10], label: "October 2019" },
        { y: orgData[5].value4[11], label: "Novemver 2019" }

      ]
    }

    ]
    return <Charts type={"bar"} title={chartTwoName} data={dataPoints} />
  }



  //create chart one
  chartThree = () => {
    const { charts, dashboards, organisationUnits } = this.state

    if (!charts || !dashboards || !organisationUnits) {
      return <div>Loading....</div>
    }


    const dashboardOneItems = dashboards[0].dashboardItems;
    const itemsIds = [];

    for (let i = 0; i < dashboardOneItems.length; i++) {
      if (dashboardOneItems[i].chart) {
        itemsIds.push(dashboardOneItems[i].chart);
      }
    }

    let requiredCharts = [];

    charts.forEach(chart => {
      if (itemsIds.find(keys2 => keys2.id === chart.id)) {
        requiredCharts.push(chart);
      }
    });

    //prepare chart three
    const chartThreeMetadata = requiredCharts[8];

    console.log(chartThreeMetadata)

    const chartThreeName = chartThreeMetadata.displayName
    const periods = 'LAST_12_MONTHS'
    const dataDimension = chartThreeMetadata.dataDimensionItems[0].dataElement.id
    const orgUnits = chartThreeMetadata.organisationUnits.map(ids => ids.id)

    // //get values
    var dataValues = $.ajax({
      url: BASE_URL + `/analytics.json?dimension=dx:${dataDimension};&dimension=ou:${orgUnits[0]}&dimension=pe:${periods}`,
      dataType: "json",
      headers: { "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD) },
      success: function (data) { },
      async: false,
      error: function (err) {
        console.log(err);
      }
    }).responseJSON;


    const orgIds = dataValues.metaData.dimensions.ou


    // // //get org display names
    const OrgUnitsDispNames = []
    organisationUnits.forEach(org => {
      orgIds.forEach(id => {
        if (org.id === id) {
          OrgUnitsDispNames.push(org.displayName)
        }
      })
    })

    // // // //get actaull data
    const actualData = dataValues.rows

    //create an array of objects that stores the values in order
    let orgData = [{
      id: '',
      values: [],
      periods: []
    }]

    let id = [], value = [], period = []



    for (let i = 0; i < actualData.length; i++) {

      if (actualData[i][1] === orgIds[0]) {
        id = OrgUnitsDispNames[0]
        value.push(parseFloat(actualData[i][3]))
        period.push(actualData[i][2])

      }

    }
    orgData.push({ id, value, period })

    //prepare chart one data
    const dataPoints = [{
      type: "stackedColumn",
      showInLegend: true,
      legendText: orgData[1].id,
      dataPoints: [
        { y: orgData[1].value[0], label: "September 2019" },
        { y: orgData[1].value[1], label: "January 2019" },
        { y: orgData[1].value[2], label: "July 2019" },
        { y: orgData[1].value[3], label: "June2019" },
        { y: orgData[1].value[4], label: "October 2019" },
        { y: orgData[1].value[5], label: "November 2019" },
        { y: orgData[1].value[6], label: "December 2018" },
        { y: orgData[1].value[7], label: "October 2019" },
        { y: orgData[1].value[8], label: "April 2019" },
        { y: orgData[1].value[9], label: "March 2019" },
        { y: orgData[1].value[10], label: "February 2019" },
        { y: orgData[1].value[11], label: "January 2019" }

      ]
    }]

    return <Charts title={chartThreeName} data={dataPoints} />
  }

  render() {
    const { charts, dashboards, organisationUnits } = this.state

    if (!charts || !dashboards || !organisationUnits) {
      return <div>Loading....</div>
    }

    return (

      <div className="App" >
        <NavBar dash1={dashboards[0].displayName} dash2={dashboards[1].displayName} dash3={dashboards[2].displayName} dash4={dashboards[3].displayName} />
        <Switch>
          <Route exact path="/" component={() =>
            <Dash1 >
              <Container>
                <Row xs='2'>
                  <Col>{this.chartOne()}</Col>
                  <Col>{this.chartTwo()}</Col>
                </Row>
                <Row xs='2'>
                  <Col>{this.chartThree()}</Col>
                </Row>
             
              </Container>

            </Dash1>} />
          <Route exact path="/dash2" component={Dashboards} />
          <Route exact path="/dash3" component={Dashboards} />
          <Route exact path="/dash4" component={Dashboards} />
        </Switch>
      </div>
    );
  }
}

export default App;
