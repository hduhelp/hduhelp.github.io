import React, { useEffect, useState } from 'react'

import { ScrollRankingBoard } from '@jiaminghi/data-view-react'

import './RankingBoard.less'
import httpGet from '../../service/request'

let data = [
  {
    name: '日常养护',
    value: 55,
  },
  {
    name: '交通事故',
    value: 120,
  },
  {
    name: '路面',
    value: 78,
  },
  {
    name: '桥通',
    value: 66,
  },
  {
    name: '计日工',
    value: 80,
  },
  {
    name: '路基',
    value: 45,
  },
  {
    name: '交安设施',
    value: 29,
  },
  {
    name: '除雪',
    value: 29,
  },
  {
    name: '绿化',
    value: 20,
  },
]
function getConfig() {
  return {
    data: data,
    rowNum: data.length,
  }
}

export default () => {
  const [config, setConfig] = useState({})
  useEffect(() => {
    createData()
    getServiceRank()

    const timer = setInterval(createData, 3000)
    const availabilityTimer = setInterval(getServiceRank, 60000)

    return () => {
      clearInterval(timer)
      clearInterval(availabilityTimer)
    }
  }, [])

  function createData() {
    setConfig(getConfig())
  }

  return (
    <div id="ranking-board">
      <div className="ranking-board-title">近24小时服务访问次数</div>
      <ScrollRankingBoard config={config} />
    </div>
  )
}

function getServiceRank() {
  httpGet('https://api.hduhelp.com/aggregating/metric/cdn/top').then(
    r =>
      (data = r.map(({ Name, Value }) => ({
        name: Name,
        value: Value,
      })))
  )
}
