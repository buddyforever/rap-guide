import React from 'react'

import { Centered } from '../styles/PageStyles'
import { DotWave } from '../components/ui/Loader'

const Loader = () => {
  return (
    <Centered height="50vh">
      <DotWave size="1.5" />
    </Centered>
  )
}

export default Loader