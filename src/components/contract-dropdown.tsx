import { Row, Col } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styles from './contract-dropdown.module.css'
import React, { useState } from 'react'

interface Props {
  contractText?: string
}

export default ({contractText}: Props) => {
  const [ showContract, setShowContract ] = useState(false)

  return (
    <div className={styles.contractContainer}>
      <Row className={styles.showFullContract} onClick={() => {setShowContract(!showContract)}}>
        <Col lg={12}>
          Contract
        </Col>
        <Col lg={12} className={styles.showFullContractIcon}>
          <PlusOutlined />
        </Col>
      </Row>
      {
        showContract ? (
          <div>
            {contractText}
          </div>
        ) : ''
      }
    </div>
  )
}
