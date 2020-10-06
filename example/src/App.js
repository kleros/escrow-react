import React from 'react'

import PayWithEscrowButton from 'kleros-escrow'
import 'kleros-escrow/dist/index.css'

const transactionCallback = () => {
  console.log(`Yay! Successful TX.`)
}

const App = () => {
  return <PayWithEscrowButton
    amount={'10000000000000000000'}
    currency={'eth'}
    subcourt={'general'}
    itemDescription={'Camera Nikon 83x optical zoom lens, model x32a 9, additional lens'}
    sellerAddress={'0x27fE00A5a1212e9294b641BA860a383783016C67'}
    transactionCallback={transactionCallback}
    sellerEmail={'blah@test.com'}
  />
}

export default App
