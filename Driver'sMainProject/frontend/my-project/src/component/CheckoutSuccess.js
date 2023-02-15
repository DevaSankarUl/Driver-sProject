import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Result } from "antd";

function CheckoutSuccess() {
  return (
    <div>
      <div>
        <div className="h-screen flex justify-center justify-items-center items-center">
          <Result
            status="success"
            title="Successfully Completed Payment"
            subTitle="You are ready to go! Click the button below"
            extra={[
              <Link to={'/'}>
                <Button key="console">Go To Website</Button>
              </Link>, // <Button key="buy">Buy Again</Button>,
            ]}
          />
        </div>
      </div>
    </div>

  )
}

export default CheckoutSuccess