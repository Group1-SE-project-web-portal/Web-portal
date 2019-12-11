import React, { Component } from 'react'
import { getOneDashboard, getCharts, getAllDashboards } from '../utils/APIUtils'
import Charts from '../components/Chart'

export default class Home extends Component {
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
        //getOneDashboard(this.state.dashId).then(data => { this.setState({ singleDashboard: data }) })

    }

    render() {
        const { charts, dashboards, singleDashboard } = this.state

        if (!charts || !dashboards) {
            return <div>Loading....</div>
        }
        const chartsId = dashboards.map(ids => ids.id)
        console.log(chartsId)
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
                <Charts title={dashboards[3].displayName} type={"spline"} data={dataPoints} />
                <Charts title={"HIV"} type={"bar"} data={dataPoints} />
                <Charts title={"IMMUNISATION"} type={"scatter"} data={dataPoints} />
                <Charts title={"EBOLA"} type={"area"} data={dataPoints} />
                <Charts title={"CHOLERA"} type={"waterfall"} data={dataPoints} />
                <Charts title={"TB"} type={"line"} data={dataPoints} />
            </div>
        )
    }


}

