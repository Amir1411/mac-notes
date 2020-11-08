import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import NotesContext from '../../../../common/context'

import styles from '../FoldersWrapper.module.scss'

const Folder = ({
  folder,
  selectFolderFn
}) => (
  <NotesContext.Consumer>
    {
      context => (
        <Link
          className={folder.url === context.current.folder ? styles.folderLabelActive : styles.folderLabel}
          key={folder.url}
          to={`/notes-app/${folder.url}`}
          onClick={() => selectFolderFn(folder.url)}
        >
          {folder.name}
        </Link>
      )
    }
  </NotesContext.Consumer>
)

Folder.propTypes = {
  folder: PropTypes.object.isRequired,
  selectFolderFn: PropTypes.func.isRequired
}

export default Folder
