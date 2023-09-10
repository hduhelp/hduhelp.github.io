import React, { useState, useEffect } from 'react'

import { DigitalFlop, Decoration10 } from '@jiaminghi/data-view-react'

import './DigitalFlop.less'
import httpGet from '../../service/request'

let wechatFollow = 0
let wechatRead = 0
let wechatServeYesterday = 0
let wechatServeToday = 0
let dingWidgetClick = 0

function getData() {
  return [
    {
      title: '微信关注量',
      number: {
        number: [wechatFollow],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#4d99fc',
          fontWeight: 'bold',
        },
      },
      unit: '位',
    },
    {
      title: '昨日推文阅读',
      number: {
        number: [wechatRead],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#f46827',
          fontWeight: 'bold',
        },
      },
      unit: '次',
    },
    {
      title: '昨日微信服务',
      number: {
        number: [wechatServeYesterday],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#40faee',
          fontWeight: 'bold',
        },
      },
      unit: '次',
    },
    {
      title: '今日微信服务',
      number: {
        number: [wechatServeToday],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#4d99fc',
          fontWeight: 'bold',
        },
      },
      unit: '次',
    },
    {
      title: '钉钉组件点击',
      number: {
        number: [dingWidgetClick],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#f46827',
          fontWeight: 'bold',
        },
      },
      unit: '次',
    },
    {
      title: '服务区',
      number: {
        number: [randomExtend(5, 10)],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#40faee',
          fontWeight: 'bold',
        },
      },
      unit: '个',
    },
    {
      title: '收费站',
      number: {
        number: [randomExtend(5, 10)],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#4d99fc',
          fontWeight: 'bold',
        },
      },
      unit: '个',
    },
    {
      title: '超限站',
      number: {
        number: [randomExtend(5, 10)],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#f46827',
          fontWeight: 'bold',
        },
      },
      unit: '个',
    },
    {
      title: '停车区',
      number: {
        number: [randomExtend(5, 10)],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#40faee',
          fontWeight: 'bold',
        },
      },
      unit: '个',
    },
  ]
}

function randomExtend(minNum, maxNum) {
  if (arguments.length === 1) {
    return parseInt(Math.random() * minNum + 1, 10)
  } else {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
  }
}

export default () => {
  const [digitalFlopData, setData] = useState([])

  useEffect(() => {
    createData()
    getWechatFollowNum()
    getWechatArticleReadNum()
    getWechatServiceTimesYesterday()
    getWechatServiceTimesToday()
    getDingTalkWidgetMetric()

    const timer = setInterval(createData, 3000)

    const wechatTimer = setInterval(getWechatFollowNum, 30000)
    const wechatServiceTimer = setInterval(getWechatServiceTimesToday, 30000)
    const dingTalkTimer = setInterval(getDingTalkWidgetMetric, 30000)

    return () => {
      clearInterval(timer)
      clearInterval(wechatTimer)
      clearInterval(wechatServiceTimer)
      clearInterval(dingTalkTimer)
    }
  }, [])

  function createData() {
    setData(getData())
  }

  return (
    <div id="digital-flop">
      {digitalFlopData.map(item => (
        <div className="digital-flop-item" key={item.title}>
          <div className="digital-flop-title">{item.title}</div>
          <div className="digital-flop">
            <DigitalFlop config={item.number} style={{ width: '100px', height: '50px' }} />
            <div className="unit">{item.unit}</div>
          </div>
        </div>
      ))}

      <Decoration10 />
    </div>
  )
}

function getWechatFollowNum() {
  httpGet('https://api.hduhelp.com/wechat/data').then(r => (wechatFollow = r.user))
}

function getWechatArticleReadNum() {
  httpGet('https://api.hduhelp.com/wechat/stats/article/read').then(r => (wechatRead = r))
}

function getWechatServiceTimesYesterday() {
  httpGet('https://api.hduhelp.com/aggregating/metric/wechat/yesterday').then(
    r => (wechatServeYesterday = Number(r))
  )
}

function getWechatServiceTimesToday() {
  httpGet('https://api.hduhelp.com/aggregating/metric/wechat/today').then(
    r => (wechatServeToday = Number(r))
  )
}

function getDingTalkWidgetMetric() {
  httpGet('https://news.hduhelp.com/subscription/v1/ding/metric').then(r => (dingWidgetClick = r))
}
