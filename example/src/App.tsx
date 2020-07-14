import React from 'react'

import PayWithEscrowButton from 'kleros-escrow'
import 'kleros-escrow/dist/index.css'

const App = () => {
  return <PayWithEscrowButton
    amount={'10000000000000000000'}
    currency={'DAI'}
    itemDescription={'Camera Nikon 83x optical zoom lens, model x32a 9, additional lens'}
  />
}

export default App
