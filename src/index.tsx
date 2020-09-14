import { Button, Modal } from 'antd'
import { addresses } from './constants/addresses'
import MULTIPLE_ARBITRABLE from './constants/multiple-arbitrable-transaction'
import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import PayView from './components/pay-view'
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
  const [ txHash, setTxHash ] = useState<string>('')

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
        const txHash = await contractInstance.methods.createTransaction(
          '100000000',
          sellerAddress,
          `/ipfs/test/metaEvidence.json`
        ).send(
          {
            from: accounts[0],
            value: amount
          }
        )

        if (txHash)
          setTxHash(txHash)
      }
    }
  }

  const closeModal = async () => {
    setShowModal(false)
    setTxHash('')
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
        width={'50%'}
        onCancel={closeModal}
      >
        <div className={styles.modalContainer}>
          {
            txHash ? (
              <div />
            ) : (
              <PayView
                hideSecuredByKleros={hideSecuredByKleros}
                address={accounts[0]}
                itemDescription={itemDescription}
                sellerAddress={sellerAddress}
                amount={amount}
                currency={currency}
                web3={web3}
                submitPurchase={submitPurchase}
                setShowModal={setShowModal}
              />
            )
          }
        </div>
      </Modal>
    </div>
  )
}

export default PayWithEscrowButton
