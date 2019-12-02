import React, { Component } from 'react'
import { getOrganisationGroups, getCharts } from '../utils/APIUtils'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            charts: '',
            isLoading: false,
            dataElements: '',
            organisationUnits: ''

        }
    }
    componentDidMount() {

        getCharts().then(data => this.setState({ charts: data.charts, isLoading: true }))
        console.log(this.state.charts)
    }

    render() {

        let data = []
        const { isLoading, charts } = this.state
        if (!charts) {
            return <div>Loading....</div>
        }
        data = charts



        return (
            <div>
                {data[0].displayName}
            </div>
        )
    }


}

