import React from 'react'
import StepOne from './StepOne'
import StepTwo from './StepTwo'

const steps =
    [
      {name: 'Case Information', component: <StepOne/>},
      {name: 'Case Target', component: <StepTwo/>},
    ]

export { steps }
