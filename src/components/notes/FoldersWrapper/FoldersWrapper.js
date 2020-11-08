import React, { useState } from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Folder from './components/Folder'
import NewFolderInput from './components/NewFolderInput'

import styles from './FoldersWrapper.module.scss';

const FoldersWrapper = (props) => {
  const { folders, selectFolderFn, addFolderFn } = props;
  const [newFolderIsCreated, setNewFolderIsCreated] = useState(false);
  const handleNewFolderClick = () => {setNewFolderIsCreated(!newFolderIsCreated)};
  return(
    <div className={classnames(styles.wrapper, props.activeSidebar ? styles.closed : null)}>
        {
          folders.map(folder => (
            <Folder
              key={folder.url}
              folder={folder}
              selectFolderFn={selectFolderFn}
            />
          ))
        }
        {
          newFolderIsCreated &&
            <NewFolderInput
              toggleFolderCreationFn={handleNewFolderClick}
              addFolderFn={addFolderFn}
            />
        }
        <button
          className={styles.addBtn}
          onClick={handleNewFolderClick}
        >
          <div className={styles.addBtnIcon}>
            +
          </div>
          <div className={styles.addBtnCaption}>New folder</div>
        </button>
      </div>
  );
}

FoldersWrapper.propTypes = {
  addFolderFn: PropTypes.func.isRequired,
  folders: PropTypes.array.isRequired,
  selectFolderFn: PropTypes.func.isRequired
}

export default FoldersWrapper
