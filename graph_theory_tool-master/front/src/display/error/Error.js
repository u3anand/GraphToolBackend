import React from 'react'
import {Alert} from 'antd'

export default function Error() {
    return (
        <div style={{width:"100%", height:"100%"}}>
            <Alert message="Mobile view is still under construction! Please check in later (for now, please use the app on pc view - apologies for any inconveniences)" type="warning" showIcon  />
        </div>
    )
}
