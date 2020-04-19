import React, { Component } from 'react'
import MultiStep from 'react-multistep'
import { steps } from './steps'

class CreateCase extends Component {

  render() {
      return (
          <div className="multi-container">
            <MultiStep steps={steps} />
          </div>
      )
  }
}

export default CreateCase
