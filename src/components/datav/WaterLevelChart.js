import React, { useEffect, useState } from 'react'

import { Charts, WaterLevelPond } from '@jiaminghi/data-view-react'

import './WaterLevelChart.less'
import httpGet from '../../service/request'

let data = [100, 98.3, 91.1, 99.3, 99.5, 100, 99]
let xAxis = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

function getConfig() {
  return {
    data: [data[0].toFixed(2)],
    shape: 'round',
    waveHeight: 25,
    waveNum: 2,
    formatter: '{value}%',
  }
}

function getOption() {
  return {
    color: ['#ffffff'],
    title: {
      text: '可用率趋势',
    },
    xAxis: {
      name: '时间',
      data: xAxis,
    },
    yAxis: {
      name: '销售额',
      data: 'value',
      max: 100,
    },
    series: [
      {
        data: data,
        type: 'line',
        lineArea: {
          show: true,
          gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)'],
        },
      },
    ],
  }
}

export default () => {
  const [options, setOptions] = useState({})
  const [config, setConfig] = useState({})
  useEffect(() => {
    createData()
    getAvailability()

    const timer = setInterval(createData, 3000)
    const availabilityTimer = setInterval(getAvailability, 60000)

    return () => {
      clearInterval(timer)
      clearInterval(availabilityTimer)
    }
  }, [])

  function createData() {
    setOptions(getOption())
    setConfig(getConfig())
  }

  return (
    <>
      <div id="availability-chart">
        <Charts option={options} />
      </div>
      <div id="water-level-chart">
        <div className="water-level-chart-title">当前服务可用率</div>

        <div className="chart-container">
          <WaterLevelPond config={config} />
        </div>
      </div>
    </>
  )
}

function getAvailability() {
  httpGet('https://api.hduhelp.com/aggregating/metric/availability').then(r => {
    xAxis = r
      .slice(0, 15)
      .reverse()
      .map(item => item.Time)
    data = r
      .slice(0, 15)
      .reverse()
      .map(item => item.Value * 100)
  })
}
