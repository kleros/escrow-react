import React from 'react'

import PayWithEscrowButton from 'kleros-escrow'
import 'kleros-escrow/dist/index.css'

const App = () => {
  return <PayWithEscrowButton
    amount={'10000000000000000000'}
    currency={'DAI'}
    itemDescription={'Camera Nikon 83x optical zoom lens, model x32a 9, additional lens'}
    sellerAddress={'0x27fE00A5a1212e9294b641BA860a383783016C67'}
  />
}

export default App
