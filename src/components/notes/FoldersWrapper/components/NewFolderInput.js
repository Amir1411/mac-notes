import React from 'react'
import PropTypes from 'prop-types'

import styles from '../FoldersWrapper.module.scss'

class NewFolderInput extends React.Component {
  validateFolderName = (e) => {
    const { addFolderFn, toggleFolderCreationFn } = this.props
    const name = e.target.value

    if (name !== '') {
      addFolderFn({
        name: name,
        url: name.toLowerCase()
      })
    }

    toggleFolderCreationFn()
  }

  render () {
    return (
      <div className={styles.inputWrapper}>
        <input
          autoFocus
          className={styles.input}
          onBlur={this.validateFolderName}
          placeholder='New folder'
          type='text'
        />
      </div>
    )
  }
}

NewFolderInput.propTypes = {
  addFolderFn: PropTypes.func.isRequired,
  toggleFolderCreationFn: PropTypes.func.isRequired
}

export default NewFolderInput
