import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Notes.module.scss';

import FoldersWrapper from './FoldersWrapper/FoldersWrapper'
import NotesWrapper from './NotesWrapper/NotesWrapper'
import Preview from './Preview/Preview'
import TopBar from './TopBar/TopBar'

import NotesContext from '../../common/context'

const Notes = () => {

    const [activeSidebar, setActiveSidebar] = useState(false);
    const [folders, setFolders] = useState([]);
    const [notes, setNotes] = useState([]);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [current, setCurrent] = useState({folder: 'notes', note: null});

    useEffect(() => {
        axios.get('https://my-json-server.typicode.com/amir1411/mac-notes/db')
        .then(function (response) {
            const initialFolders = response.data.initialFolders.sort((a, b) => {
                if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
                return 0;
            });

            const initialNotes = response.data.initialNotes;
            setFolders(initialFolders)
            setNotes(initialNotes)
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [])

    const notesWrapperRef = React.createRef();

    const addNote = note => {
        resetSearchFilter();
        setNotes([...notes, note]);
        setCurrent({...current, note: note.id});
        scrollNotesWrapperToBottom()
    }

    const selectFolder = (folder) => {
        const firstNoteFromFolder = folder === 'notes' ? notes[0] : notes.find(note => note.folder === folder)

        setCurrent({
            folder: folder,
            note: firstNoteFromFolder ? firstNoteFromFolder.id : null
        })
        resetSearchFilter()
    }

    const addFolder = folder => {
        const folderArr = [...folders];
        folderArr.push(folder);
        setFolders(folderArr);
    }

    const deleteNote = () => {
        const noteToDelete = notes.findIndex((note) => note.id === current.note)
    
        if (noteToDelete !== -1) {
            notes.splice(noteToDelete, 1);
            setNotes(notes);
            setCurrent({...current, note: null});
        }
    }

    const searchNotes = phrase => {
        setSearchPhrase(phrase);
        setCurrent({folder: 'notes', note: null})
    }

    const selectNote = note => {
        setCurrent({folder: current.folder, note});
    }

    const editNote = e => {
        const notesCopy = [...notes]

        const notesToEdit = notesCopy.findIndex((note) => note.id === current.note)
        notesCopy[notesToEdit].content = e.target.value
        notesCopy[notesToEdit].editDate = new Date()

        setNotes([...notesCopy])
    }

    const scrollNotesWrapperToBottom = () => {
        const notesWrapper = notesWrapperRef.current
        notesWrapper.scrollTo({
            top: notesWrapper.scrollHeight,
            behavior: 'smooth'
        })
    }

    const resetSearchFilter = () => {
        setSearchPhrase('');
    }

    const collapseFn = (el) => {
        setActiveSidebar(el);
    }

    const contextValues = {
        current: current,
        searchPhrase: searchPhrase
    }

    return (
        <NotesContext.Provider value={contextValues}>
            <div className={styles.desktop}>
                <div className={styles.appWrapper}>
                    <TopBar
                        addNoteFn={addNote}
                        deleteNoteFn={deleteNote}
                        searchNotesFn={searchNotes}
                        collapseFn={collapseFn}
                        activeSidebar={activeSidebar}
                    />
                    <div className={styles.viewWrapper}>
                        <FoldersWrapper
                            folders={folders}
                            selectFolderFn={selectFolder}
                            addFolderFn={addFolder}
                            activeSidebar={activeSidebar}
                        />
                        <NotesWrapper
                            addNoteFn={addNote}
                            current={current}
                            searchPhrase={searchPhrase}
                            notes={notes}
                            selectNoteFn={selectNote}
                            ref={notesWrapperRef}
                        />
                        <Preview
                            note={(notes).find((note) => note.id === current.note)}
                            editFn={editNote}
                        />
                    </div>
                </div>
            </div>
        </NotesContext.Provider>
    )
}

export default Notes
