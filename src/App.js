import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Dash1 from './pages/Dash1'
import Dashboards from './pages/Dashboards'
import NavBar from './components/NavBar.js'
import Charts from './components/Chart'
import $ from 'jquery';


import { getAllDashboards, getCharts, oneChart, getData, request, getOrganisationUnits } from './utils/APIUtils'
import { BASE_URL, USERNAME, PASSWORD } from './constants/Constants';
import { promised } from 'q';




class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      charts: '',
      dashId: '',
      isLoading: false,
      singleDashboard: '',
      dashboards: '',
      dataElements: '',
      organisationUnits: ''

    }
  }
  componentDidMount() {

    getCharts().then(data => { this.setState({ charts: data.charts }) })
    getAllDashboards().then(data => { this.setState({ dashboards: data.dashboards }) })
    getOrganisationUnits().then(data => { this.setState({ organisationUnits: data.organisationUnits }) })


  }


  render() {


    const { charts, dashboards, organisationUnits } = this.state

    if (!charts || !dashboards || !organisationUnits) {
      return <div>Loading....</div>
    }

    const dashboardOneItems = dashboards[0].dashboardItems
    const itemsIds = []

    for (let i = 0; i < dashboardOneItems.length; i++) {
      if (dashboardOneItems[i].chart) {
        itemsIds.push(dashboardOneItems[i].chart)
      }
    }

    let requiredCharts = []

    charts.forEach(keys1 => {

      if (itemsIds.find(keys2 => keys2.id === keys1.id)) {
        requiredCharts.push(keys1)
      }
    })

    //prepare chart One
    const chartOneMetadata = requiredCharts[6];

    const chartOneName = chartOneMetadata.displayName
    const chartOneType = chartOneMetadata.type.toLowerCase()
    const orgFilter = chartOneMetadata.series
    const periodFilter = chartOneMetadata.category
    const periods = 'LAST_12_MONTHS'
    const dataDimension = chartOneMetadata.dataDimensionItems[0].dataElement.id
    const orgUnits = chartOneMetadata.organisationUnits.map(ids => ids.id)

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

    const OrgUnitsDispNames = []
    organisationUnits.forEach(org => {
      orgIds.forEach(id => {
        if (org.id === id) {
          OrgUnitsDispNames.push(org.displayName)
        }
      })
    })

    const periodNames = dataValues.metaData.items

    const actualData = dataValues.rows

    let orgData = [{
      id: [],
      values: [],
      periods: []
    }]
    const orgData2 = [{
      id: [],
      values: [],
      periods: []
    }]

    for (let i = 0; i < actualData.length; i++) {
      if (actualData[i][1] === orgIds[0]) {
        orgData[0].id.push(orgIds[0] )
        orgData[0].values.push(parseFloat(actualData[i][3]))
        orgData[0].periods.push(actualData[i][2])
      }

    }

    // for (let i = 0; i < actualData.length; i++) {
    //   if (actualData[i][1] === orgIds[3]) {
    //    // orgData[1].id.push(orgIds[1])
    //     orgData[1].values.push(parseFloat(actualData[i][3]))
    //     orgData[1].periods.push(actualData[i][2])
    //   }
    // }
    //for (let i = 0; i < actualData.length; i++) {
    //   if (actualData[i][1] === orgIds[3]) {
    //     orgData[3].id = orgIds[3]
    //     orgData[3].values.push(parseFloat(actualData[i][3]))
    //     orgData[3].periods.push(actualData[i][2])
    //   }

    // }

    // for (let i = 0; i < actualData.length; i++) {
    //   if (actualData[i][1] === orgIds[4]) {
    //     orgData[4].id = orgIds[0]
    //     orgData[4].values.push(parseFloat(actualData[i][3]))
    //     orgData[4].periods.push(actualData[i][2])
    //   }

    // }

    console.log(orgData)


    //console.log(actualData)
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
    //console.log(actualData)
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
    ]


    const chartOne = () => {
      return <Charts type={chartOneType} title={chartOneName} data={dataPoints} />
    }
    const chartTwo = () => {
      return <Charts type={"bar"} title={"hiv fact"} data={dataPoints} />
    }
    return (
      <div className="App" >

        <NavBar dash1={dashboards[3].displayName} dash2={dashboards[6].displayName} dash3={dashboards[0].displayName} dash4={dashboards[1].displayName} />
        <Switch>
          <Route exact path="/" component={() =>
            <Dash1 >
              {chartOne()}
              {chartTwo()}
            </Dash1>} />
          <Route exact path="/dash2" component={Dashboards} />
          <Route exact path="/dash3" component={Dashboards} />
          <Route exact path="/dash4" component={Dashboards} />

        </Switch>

      </div>

    )

  }
}

export default App;
