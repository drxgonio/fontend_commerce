import React, { Component } from 'react'
import axios from 'axios';
import { API_BASE_URL } from 'API/URLMapping'
import CanvasJSReact from '../../../../../assets/canvasjs.react';
import { Row, Col, Label } from "reactstrap";
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export class ChartMoney extends Component {
    constructor(props) {
        super(props);
        this.state = { Data: {}, date: new Date(), isLoading: false, };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({ date: value });

        axios.get(API_BASE_URL + `/dashboard/summoneyonemounthdate?date=` + this.state.date)
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
            .catch((err) => {
                this.setState({ isLoading: false });
            });

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
        var date = new Date();
        var datevalue = date.toISOString().substr(0, 10);
        return (
            <div>
                <Row>
                    
                    <Col md={3}>
                        <input type="text" placeholder="Nhập ngày" onChange={this.handleChange} className="form-control" type="date"
                            style={{ width: 200 }} defaultValue={datevalue} />
                    </Col>

                </Row>
                <CanvasJSChart options={this.state.Data}
                /* onRef={ref => this.chart = ref} */
                />

            </div>
        );
    }
}

export default ChartMoney  