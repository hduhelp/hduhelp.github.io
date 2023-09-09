import React from 'react'

import { Decoration5, Decoration8 } from '@jiaminghi/data-view-react'

import './TopHeader.less'

export default () => {
  return (
    <div id="top-header">
      <Decoration8 className="header-left-decoration" />
      <Decoration5 className="header-center-decoration" />
      <Decoration8 className="header-right-decoration" reverse={true} />
      <div className="center-title">杭电助手数据大屏</div>
    </div>
  )
}
