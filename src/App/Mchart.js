import React, { Component } from 'react';
import ReactEcharts from "echarts-for-react";

class Mchart extends Component {
  constructor(props) {
    super(props);
  };

  getOption = (props) => {
    const newdata = this.props.characters
    let name = [];
    let chartdata = [];
    if(newdata.length>0){
    for (var i = 0; i < newdata.length; i++) {
      let arrdata = {
        name: newdata[i].coin,
        value: newdata[i].valuedata
      }
      name.push(newdata[i].coin);
      chartdata.push(arrdata)
    }
  }

    let option = {
      title: {
        text: '仓位',
        subtext: '测试',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: name
      },
      series: [
        {
          name: '测试',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data:chartdata,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    return option;
  }
  render() {

    return (<ReactEcharts option={this.getOption()} />)
  }

}



export default Mchart