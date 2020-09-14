import { Row, Col } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import styles from './contract-dropdown.module.css'
import React, { useState } from 'react'

interface Props {
  amount: string,
  address?: string,
  itemDescription: string,
  seller: string,
  dueDate: string,
  additionalClause?: string,
  disputeDeadline: string
}

const ContractDropdown = ({amount, address, itemDescription, seller, dueDate, additionalClause, disputeDeadline}: Props) => {
  const [ showContract, setShowContract ] = useState(false)

  return (
    <div className={styles.contractContainer}>
      <Row className={styles.showFullContract} onClick={() => {setShowContract(!showContract)}}>
        <Col lg={12} md={16} sm={18} xs={20}>
          Contract
        </Col>
        <Col lg={12} md={8} sm={6} xs={4} className={styles.showFullContractIcon}>
          {
            showContract ? (
              <MinusOutlined />
            ) : (
              <PlusOutlined />
            )
          }
        </Col>
      </Row>
      {
        showContract ? (
          <div className={styles.contractText}>
            <span>By Paying {amount}, ETH address {address} should receive: {itemDescription}, from {seller} before {dueDate}</span>
            <br/><br/>
            {
              additionalClause ? (
                <div>
                  <span>{additionalClause}</span>
                  <br/><br/>
                </div>
              ) : ''
            }
            <span>In case of a dispute, it will be arbitrated by Kleros E-Commerce court. If no dispute is raised before {disputeDeadline}, the funds in escrow will automatically be released.</span>
            <br/><br/>
            <a href="https://kleros.io">Learn more about how the Escrow works?</a>
          </div>
        ) : ''
      }
    </div>
  )
}

export default ContractDropdown
