import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    const {notes} = useSelector(state => state.notes);


    return (
        <div className="journal__entries animate__animated animate__fadeIn animate_faster">

            {
                notes.map(note => (
                    <JournalEntry 
                        key={ note.id } 
                        note = {note}
                    />
                ))
            }
            
        </div>
    )
}
