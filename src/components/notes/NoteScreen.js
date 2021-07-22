import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote, startDeteling } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active } = useSelector(state => state.notes);

    const [formValues, handleInputChange, reset] = useForm(active);

    const { body, title, url } = formValues;

    const activeId = useRef( active.id );

    useEffect(() => {
        
        if(active.id !== activeId.current) {
            reset(active);
            activeId.current = active.id;
        }

    }, [active, reset]);

    useEffect(() => {
        
        dispatch(activeNote(formValues.id, {...formValues}));

    }, [formValues, dispatch])

    const handleDetele = () => {

        dispatch(startDeteling(active.id));

    }

    return (
        <div className="note__main-content">
            <NotesAppBar />

            <div className="note__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="note__title-input"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="note__textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {url && (
                    <div className="note__image">
                        <img src={url} alt="imagen" />
                    </div>
                )}
            </div>

                    <button 
                        className="btn btn-danger" 
                        onClick={ handleDetele }
                    >
                        Delete
                    </button>

        </div>
    );
};
