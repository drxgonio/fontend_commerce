import React, { Component } from 'react'
import axios from 'axios';
import { API_BASE_URL } from 'API/URLMapping'
import CanvasJSReact from '../../../../assets/canvasjs.react';
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
export class Linechart extends Component {
    constructor(props) {
        super(props);
        this.state = { Data: {}, date: new Date(), isLoading: false, };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({ date: value });

        axios.get(API_BASE_URL + `/dashboard/summoneyoneweekdate?date=` + this.state.date)
            .then(res => {
                this.setState({ isLoading: true });
                const ipl = res.data;
                ipl.forEach(record => {

                    record.x = new Date(record.x);
                });
                this.setState({
                    Data: {
                        animationEnabled: true,
                        title: {
                            text: "Doanh thu bán ra trong tuần"
                        },
                        axisX: {
                            valueFormatString: "DD MMM YYYY"
                        },
                        axisY: {
                            title: "Sales (in VND)",
                            prefix: "$",
                            includeZero: false
                        },
                        data: [{
                            yValueFormatString: "vnd #,###",
                            xValueFormatString: "DD",
                            showInLegend: true,
                            type: "spline",
                            dataPoints: ipl
                        }]
                    }
                });
            })
            .catch((err) => {
                this.setState({ isLoading: false });
            });
    }
    componentDidMount() {
        axios.get(API_BASE_URL + `/dashboard/summoneyoneweek`)
            .then(res => {
                const ipl = res.data;
                ipl.forEach(record => {

                    record.x = new Date(record.x);
                });
                this.setState({
                    Data: {
                        animationEnabled: true,
                        title: {
                            text: "Doanh thu bán ra trong tuần"
                        },
                        axisX: {
                            valueFormatString: "DD MMM YYYY"
                        },
                        axisY: {
                            title: "Sales (in VND)",
                            prefix: "$",
                            includeZero: false
                        },
                        data: [{
                            yValueFormatString: "vnd #,###",
                            xValueFormatString: "DD",
                            showInLegend: true,
                            type: "spline",
                            dataPoints: ipl
                        }]
                    }
                });
            })
    }
    // handleChange(event){
    //     const target = event.target;
    //     const value = target.value;

    // }
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

export default Linechart  