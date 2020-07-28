import React, { Component } from 'react'
import axios from 'axios';
import {API_BASE_URL} from 'API/URLMapping'
import CanvasJSReact from '../../../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export class Barchart extends Component {
    constructor(props) {
        super(props);
        this.state = { Data: {} };
    }
    componentDidMount() {
        axios.get(API_BASE_URL+`/dashboard/countorderoneweek`)
            .then(res => {
                console.log(res);
                const ipl = res.data;
                this.setState({
                    Data: {
                        title: {
                            text: "Số lượng sản phẩm bán ra"
                        },
                        animationEnabled: true,
                        data: [
                        {
                            // Change type to "doughnut", "line", "splineArea", etc.
                            type: "column",
                            dataPoints:ipl
                        }
                        ]
                    }
                });
            })
    }
    render() {	
		return (
		<div>
            {console.log(this.state.Data)}
			<CanvasJSChart options = {this.state.Data} 
				/* onRef={ref => this.chart = ref} */
			/>

		</div>
		);
	}
}

export default Barchart  