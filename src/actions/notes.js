import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpdated } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


export const startNewNote = () => {
    return  async (dispatch, getState) => {

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        const doc = await db.collection( `${uid}/journal/notes` ).add(newNote);


        dispatch( activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote))

    }
}

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

export const startSaveNote = (note) => {

    return async(dispatch, getSate) => {

        const {uid} = getSate().auth;

        if(!note.url) {
            delete note.url;
        }

        const noteToFiresote = { ...note };
        delete noteToFiresote.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFiresote);

        dispatch(refreshNote(note.id, noteToFiresote));
        Swal.fire('Saved', note.title, 'success');
    
    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
})

export const startUploading = ( file ) => {
    return async(dispatch, getState) =>{
        const {active} = getState().notes;

        Swal.fire({
            title:'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpdated( file );
        active.url = fileUrl;

        dispatch( startSaveNote( active ) );

        Swal.close()

    }
}

export const startDeteling = ( id ) => {
    return async(dispatch, getSate) => {

        const uid = getSate().auth.uid;
        await db.doc(`${uid}/jpurnal/notes/${id}`).delete();

        dispatch(deleteNote(id));

        Swal.fire('Deleted', 'Note Deleted', 'error')


    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})

export const noteLogout = () => ({
    type: types.notesLogoutCleaning,
})