import { Button, Modal, Row, Col } from 'antd'
import { addresses } from './constants/addresses'
import MULTIPLE_ARBITRABLE from './constants/multiple-arbitrable-transaction'
import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import ContractDropdown from './components/contract-dropdown'
import SecuredByKleros from './assets/secured-by-kleros.png'
import Web3 from 'web3'

interface PayWithEscrowButtonProps {
  text?: string,
  style?: object,
  hideSecuredByKleros?: boolean,
  amount: string,
  currency?: string,
  itemDescription: string,
  web3?: Web3,
  sellerAddress: string,
  subcourt?: string,
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
    sellerAddress,
    subcourt,
    hideSecuredByKleros
  }: PayWithEscrowButtonProps
) => {
  const [ showModal, setShowModal ] = useState(false)
  const [ accounts, setAccounts ] = useState<Array<string>>([])

  if (!web3) {
    web3 = new Web3(window.ethereum)
  }

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = web3 && await web3.eth.getAccounts()
      if (accounts)
        setAccounts(accounts)
    }

    getAccounts()
  }, [])

  // Launch arbitrable transaction
  const submitPurchase = async () => {
    if (web3) {
      const _contractAddress = addresses[currency][subcourt]
      if (_contractAddress) {
        const contractInstance = new web3.eth.Contract(
          MULTIPLE_ARBITRABLE,
          _contractAddress
        )
        contractInstance.methods.createTransaction(
          '100000000',
          sellerAddress,
          `/ipfs/test/metaEvidence.json`
        ).send(
          {
            from: accounts[0],
            value: amount
          }
        )
      }
    }
  }

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
        footer={null}
        width={'60%'}
      >
        <div className={styles.modalContainer}>
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
              address={accounts[0]}
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
      </Modal>
    </div>
  )
}

export default PayWithEscrowButton
