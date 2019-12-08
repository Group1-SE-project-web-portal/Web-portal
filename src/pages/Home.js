import React, { Component } from 'react'
import { getDashboards, getCharts } from '../utils/APIUtils'
import Charts from '../components/Chart'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            charts: '',
            isLoading: false,
            dashboard: '',
            dataElements: '',
            organisationUnits: ''

        }
    }
    componentDidMount() {

        getCharts().then(data => { this.setState({ charts: data.charts }) })
            .then(getDashboards("JW7RlN5xafN").then(dash => { this.setState({ dashboard: dash }) }))

    }

    render() {
        const { charts, dashboard } = this.state
        console.log(dashboard)

        if (!charts || !dashboard) {
            return <div>Loading....</div>
        }

        const dataPoints = [
            { x: new Date(2017, 0), y: 25060 },
            { x: new Date(2017, 1), y: 27980 },
            { x: new Date(2017, 2), y: 42800 },
            { x: new Date(2017, 3), y: 32400 },
            { x: new Date(2017, 4), y: 35260 },
            { x: new Date(2017, 5), y: 33900 },
            { x: new Date(2017, 6), y: 40000 },
            { x: new Date(2017, 7), y: 52500 },
            { x: new Date(2017, 8), y: 32300 },
            { x: new Date(2017, 9), y: 42000 },
            { x: new Date(2017, 10), y: 37160 },
            { x: new Date(2017, 11), y: 38400 }
        ]

        return (
            <div>

                {charts[0].displayName}

                <Charts title={"MARIA VACCINES"} type={"spline"} data={dataPoints} />
                <Charts title={"HIV"} type={"bar"} data={dataPoints} />
                <Charts title={"IMMUNISATION"} type={"scatter"} data={dataPoints} />
                <Charts title={"EBOLA"} type={"area"} data={dataPoints} />
                <Charts title={"CHOLERA"} type={"waterfall"} data={dataPoints} />
                <Charts title={"TB"} type={"pie"} data={dataPoints} />


            </div>
        )
    }


}

