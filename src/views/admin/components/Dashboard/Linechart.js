import React, { Component } from 'react'
import axios from 'axios';
import {API_BASE_URL} from 'API/URLMapping'
import CanvasJSReact from '../../../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export class Linechart extends Component {
    constructor(props) {
        super(props);
        this.state = { Data: {} };
    }
    componentDidMount() {
        axios.get(API_BASE_URL+`/dashboard/summoneyoneweek`)
            .then(res => {
                const ipl = res.data;
                ipl.forEach(record => {
                   
                    record.x = new Date(record.x);
                });
                console.log(ipl)
                this.setState({
                    Data: {
                        animationEnabled: true,
                        title:{
                            text: "Doanh thu bán ra trong tuần"
                        },
                        axisX: {
                            valueFormatString: "DD MMM YYYY"
                        },
                        axisY: {
                            title: "Sales (in USD)",
                            prefix: "$",
                            includeZero: false
                        },
                        data: [{
                            yValueFormatString: "$#,###",
                            xValueFormatString: "DD",
                            type: "spline",
                            dataPoints: ipl
                        }]
                    }
                });
            })
    }
    render() {	
		return (
		<div>
			<CanvasJSChart options = {this.state.Data} 
				/* onRef={ref => this.chart = ref} */
			/>

		</div>
		);
	}
}

export default Linechart  