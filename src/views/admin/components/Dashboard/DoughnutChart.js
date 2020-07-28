import React, { Component } from 'react'
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import {API_BASE_URL} from 'API/URLMapping'
import CanvasJSReact from '../../../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export class DoughnutChart extends Component {
    constructor(props) {
        super(props);
        this.state = { Data: {} };
    }
    componentDidMount() {
        axios.get(API_BASE_URL+`/dashboard/countproducttop`)
            .then(res => {
                console.log(res);
                const ipl = res.data;
                this.setState({
                    Data: {
                        exportEnabled: true,
                        animationEnabled: true,
                        title: {
                            text: "Top sản phẩm được mua nhiều"
                        },
                        data: [{
                            type: "pie",
                            startAngle: 75,
                            toolTipContent: "<b>{label}</b>: {y}%",
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabelFontSize: 16,
                            indexLabel: "{label} - {y}%",
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
export default DoughnutChart  