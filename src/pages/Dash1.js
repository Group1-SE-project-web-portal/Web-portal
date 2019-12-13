import React, { Component } from 'react'
import { getCharts, getAllDashboards } from '../utils/APIUtils'
import Charts from '../components/Chart'
import Dashboards from './Dashboards'

export default class Dash1 extends Component {
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

    }

    render() {
        const { charts, dashboards } = this.state

        if (!charts || !dashboards) {
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

        let chartsId = []

        charts.forEach(keys1 => {

            if (itemsIds.find(keys2 => keys2.id === keys1.id)) {
                requiredCharts.push(keys1)
            }
        })
        console.log(requiredCharts)
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
        ]

        return (
            <div>
                <Charts title={dashboards[3].name} type={"spline"} data={dataPoints} />
                <Charts title={"HIV"} type={"bar"} data={dataPoints} />
                <Charts title={"IMMUNISATION"} type={"scatter"} data={dataPoints} />
                <Charts title={"EBOLA"} type={"area"} data={dataPoints} />
                <Charts title={"CHOLERA"} type={"waterfall"} data={dataPoints} />
                <Charts title={"TB"} type={"line"} data={dataPoints} />
            </div>
        )
    }


}

