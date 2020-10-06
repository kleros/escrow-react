import { Row, Col, Input } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import styles from './notification-view.module.css'
import React, { useState } from 'react'

interface NotificationViewProps {
  txHash?: string,
  sellerEmail?: string,
}

const NotificationView = (
  {
    txHash,
    sellerEmail,
  }: NotificationViewProps
) => {
  const registerTransactionNotifications = () => {
    if (email) {
      // TODO
      fetch('post', {
        method: 'post',
        body: JSON.stringify({
          txHash,
          sellerEmail,
          buyerEmail: email
        })
      })
    }
  }

  const [ email, setEmail ] = useState<string>('')

  return (
    <div>
      <Row>
        <Col lg={24} md={24} sm={24} xs={24} className={styles.mailIcon}>
          <MailOutlined />
        </Col>
      </Row>
      <Row>
        <Col lg={24} md={24} sm={24} xs={24} className={styles.header}>
          Notifications
        </Col>
      </Row>
      <Row className={styles.subHeadRow} >
        <Col className={styles.subHead}>
          We advise you to enable notifications to stay informed with this transaction in case there is a dispute. There may be times where you will need to take actions.
        </Col>
      </Row>
      <Row>
        <Col lg={24}>
          <Input
            className={styles.emailInput}
            placeholder={'youremail@email.com'}
            onChange={(e) => { setEmail(e.target.value as string)} }/>
        </Col>
      </Row>
      <Row className={styles.actionButtons}>
        <Col lg={5} md={7} sm={10} xs={11}>
          <div className={styles.cancelButton}>Return</div>
        </Col>
        <Col lg={14} md={10} sm={4} xs={2}>
        </Col>
        <Col lg={5} md={7} sm={10} xs={11}>
          <div className={styles.payButton} onClick={() => registerTransactionNotifications()}>Submit</div>
        </Col>
      </Row>
    </div>
  )
}

export default NotificationView
