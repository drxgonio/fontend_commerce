import React, { Component } from 'react'
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {API_BASE_URL} from 'API/URLMapping'
export class Barchart extends Component {
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
        axios.get(API_BASE_URL+`/dashboard/countorderoneweek`)
            .then(res => {
                console.log(res);
                const ipl = res.data;
                console.log(ipl);
                let date = [];
                let count = [];
                ipl.forEach(record => {
                    date.push(record.date);
                    count.push(record.count);
                });
                this.setState({
                    Data: {
                        labels: date,
                        datasets: [
                            {
                                label: 'IPL Số lượng bán ra',
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

                <Bar  data={this.state.Data}
                    options={{ maintainAspectRatio: false }} ></Bar >
            </div>
        )
    }
}
export default Barchart  