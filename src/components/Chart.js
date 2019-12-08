import React, { Component } from 'react'
import CanvasJSReact from './canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Charts extends Component {

    render(props) {

        const options = {
            animationEnabled: true,
            title: {
                text: this.props.title
            },
            axisX: {
                valueFormatString: "MMM"
            },
            axisY: {
                title: "Sales (in USD)",
                prefix: "$",
                includeZero: false
            },
            data: [{
                yValueFormatString: "$#,###",
                xValueFormatString: "MMMM",
                type: this.props.type,
                dataPoints: this.props.data
            }]
        }
        return (
            <div>
                <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}
export default Charts; 