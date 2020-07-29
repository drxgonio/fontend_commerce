import React, { Component } from 'react'
import axios from 'axios';
import { API_BASE_URL } from 'API/URLMapping'
import CanvasJSReact from '../../../../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export class ChartMoney extends Component {
    constructor(props) {
        super(props);
        this.state = { Data1: {}, Data2: {}, Data2: {} };
    }
    componentDidMount() {
        axios.get(API_BASE_URL + `/dashboard/summoneyonemounth`)
            .then(res => {
                const ipl = res.data;
                console.log(ipl);
                this.setState({
                    Data: {
                        animationEnabled: true,
                        exportEnabled: true,
                        theme: "light2", // "light1", "dark1", "dark2"
                        title: {
                            text: "Biểu đồ thu nhập của ba tháng gần nhất"
                        },
                        axisY: {
                            title: "Sales (in VND)",
                            includeZero: false,
                            suffix: ""
                        },
                        axisX: {
                            title: "Ngày",
                            prefix: "D",
                            interval: 2
                        },
                        data: ipl
                    }
                });
            })
    }
    render() {
        return (
            <div>
                <CanvasJSChart options={this.state.Data}
                /* onRef={ref => this.chart = ref} */
                />

            </div>
        );
    }
}

export default ChartMoney  