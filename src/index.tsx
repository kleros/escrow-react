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
  itemDescription: string,
  web3?: Web3,
  sellerAddress: string
}

declare global {
    interface Window { ethereum: any; }
}

const PayWithEscrowButton = ({
    text,
    style,
    itemDescription,
    amount,
    currency,
    web3,
    sellerAddress
  }: PayWithEscrowButtonProps
) => {
  const [ showModal, setShowModal ] = useState(false)
  if (!web3) {
    console.log(window.ethereum)
    web3 = new Web3(window.ethereum)
    if (window.ethereum) {

    } else {
      // Ask for connection TODO
    }
  }
  console.log(web3.eth.accounts[0])

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
            <ContractDropdown
              address={web3.eth.accounts[0]}
              amount={`${web3.utils.fromWei(amount)} ${currency || 'ETH'}`}
              itemDescription={itemDescription}
              seller={sellerAddress}
              dueDate={(new Date()).toString()}
              disputeDate={(new Date()).toString()}
            />
          </Row>
        </div>
      </Modal>
    </div>
  )
}

export default PayWithEscrowButton
