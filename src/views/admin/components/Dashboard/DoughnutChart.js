import React, { Component } from 'react'
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
export class DoughnutChart extends Component {
    render() {
        return (
            <div>

            </div>
        )
    } constructor(props) {
        super(props);
        this.state = { Data: {} };
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/dashboard/countproducttop`)
            .then(res => {
                console.log(res);
                const ipl = res.data;
                console.log(ipl);
                let name = [];
                let count = [];
                ipl.forEach(record => {
                    name.push(record.name);
                    count.push(record.count);
                });
                this.setState({
                    Data: {
                        labels: name,
                        datasets: [
                            {
                                label: 'IPL 2018/2019 Top Run Scorer',
                                data: count,
                                backgroundColor: [
                                    "#3cb371",
                                    "#0000FF",
                                    "#9966FF",
                                    "#4C4CFF",
                                    "#00FFFF",
                                    "#f990a7",
                                    "#aad2ed",
                                    "#FF00FF",
                                    "Blue",
                                    "Red"
                                ]
                            }
                        ]
                    }
                });
            })
    }
    render() {
        return (
            <div>

                <Doughnut  data={this.state.Data}
                    options={{ maintainAspectRatio: false }} ></Doughnut >
            </div>
        )
    }
}
export default DoughnutChart  