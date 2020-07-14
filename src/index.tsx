import { Button, Modal, Row, Col } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import styles from './styles.module.css'
import ContractDropdown from './components/contract-dropdown'
import Web3 from 'web3'

interface PayWithEscrowButtonProps {
  text?: string,
  style?: object,
  showSecuredByKleros?: boolean,
  amount: string,
  currency?: string,
  itemDescription?: string
}

const contractText = `By Paying [Price/deposit], [Blockchain] address [Address] should receive [Deliverable Description] from the [Seller/Service Provider] before [Due Date].
  \n\n
  [Additional Clause (According to the type of escrow) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur].
  \n
  In case of a dispute, it will be arbitrated by Kleros E-Commerce court.
  If no dispute is raised before [date], the funds in escrow will automatically be released.
  Learn more about how the Escrow works?`

const PayWithEscrowButton = ({text, style, itemDescription, amount, currency}: PayWithEscrowButtonProps) => {
  const [ showModal, setShowModal ] = useState(false)
  const web3 = new Web3('https://mainnet.infura.io')

  return (
    <div>
      <Button
        style={style}
        className={styles.payWithEscrowButton}
        onClick={() => {setShowModal(!showModal)}}
      >
        {text || 'Pay With Escrow'}
      </Button>
      <Modal
        visible={showModal}
        closable={false}
        className={styles.payModal}
        onCancel={() => {setShowModal(false)}}
        width={'60%'}
      >
        <div className={styles.modalContainer}>
          <Row>
            <Col className={styles.backButton} onClick={() => {setShowModal(false)}} lg={12} md={12} sm={8} xs={8}>
              <ArrowLeftOutlined />
              <div className={styles.back}>Back</div>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12} className={styles.payWithEscrow}>
              Pay with Escrow
            </Col>
          </Row>
          <Row className={styles.itemDescriptionRow} >
            <Col className={styles.itemDescription}>
              {itemDescription}
            </Col>
          </Row>
          <Row className={styles.amountRow} >
            <Col className={styles.amount}>
              {`${web3.utils.fromWei(amount)} ${currency || 'ETH'}`}
            </Col>
          </Row>
          <Row>
            <ContractDropdown contractText={contractText}/>
          </Row>
        </div>
      </Modal>
    </div>
  )
}

export default PayWithEscrowButton
