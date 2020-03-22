import React, { Component } from 'react'
import MultiStep from 'react-multistep'
import { steps } from './steps'

import axios from 'axios'

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
