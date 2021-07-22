import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploading } from "../../actions/notes";

export const NotesAppBar = () => {
    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes);

    const handleSave = () => {
        dispatch(startSaveNote(active));
    };

    const handlePictureClick = () => {
        document.querySelector('#fileSelectro').click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if ( file ) {
            dispatch(startUploading( file) );
        }
    };

    return (
        <div className="note__appbar">
            <span>28 de Agosto 2020</span>

            <input
                type="file"
                style={{ display: "none" }}
                name="files"
                onChange={handleFileChange}
                id="fileSelectro"
            />

            <div>
                <button className="btn" onClick={handlePictureClick}>
                    picture
                </button>

                <button className="btn" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
};
