import React, { Component } from 'react'
import { getDashboards, getCharts } from '../utils/APIUtils'

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
        return (
            <div>
                {charts[0].displayName}
            </div>
        )
    }


}

