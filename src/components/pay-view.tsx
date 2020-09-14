import { Row, Col } from 'antd'
import styles from './pay-view.module.css'
import ContractDropdown from './contract-dropdown'
import SecuredByKleros from '../assets/secured-by-kleros.png'
import React from 'react'
import Web3 from 'web3'

interface PayViewProps {
  hideSecuredByKleros?: boolean,
  address: string,
  itemDescription: string,
  sellerAddress: string,
  amount: string,
  currency?: string,
  web3: Web3,
  submitPurchase: any,
  setShowModal: any,
}

const PayView = (
  {
    hideSecuredByKleros,
    address,
    itemDescription,
    sellerAddress,
    amount,
    currency,
    web3,
    submitPurchase,
    setShowModal
  }: PayViewProps
) => {
  return (
    <div>
      <Row>
        <Col lg={24} md={24} sm={24} xs={24} className={styles.payWithEscrow}>
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
          {`${web3.utils.fromWei(amount)} ${currency ? currency.toUpperCase() : 'ETH'}`}
        </Col>
      </Row>
      <Row>
        <ContractDropdown
          address={address}
          amount={`${web3.utils.fromWei(amount)} ${currency ? currency.toUpperCase() : 'ETH'}`}
          itemDescription={itemDescription}
          seller={sellerAddress}
          dueDate={(new Date()).toString()}
          disputeDeadline={(new Date()).toString()}
        />
      </Row>
      <Row className={styles.actionButtons}>
        <Col lg={5} md={7} sm={10} xs={11}>
          <div className={styles.cancelButton} onClick={() => setShowModal(false)}>Return</div>
        </Col>
        <Col lg={14} md={10} sm={4} xs={2}>
        </Col>
        <Col lg={5} md={7} sm={10} xs={11}>
          <div className={styles.payButton} onClick={() => submitPurchase()}>Pay</div>
        </Col>
      </Row>
      {
        !hideSecuredByKleros ? (
          <Row className={styles.securedByKleros}>
            <Col lg={19} md={17} sm={14}>
            </Col>
            <Col lg={5} md={7} sm={10}>
              <img className={styles.securedByKlerosImg} src={SecuredByKleros} />
            </Col>
          </Row>
        ) : ''
      }
    </div>
  )
}

export default PayView
