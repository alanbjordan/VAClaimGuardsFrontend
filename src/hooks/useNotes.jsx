// src/hooks/useNotes.jsx

import { useState, useCallback } from 'react';
import { generateId } from '../utils/helpers';

export function useNotes() {
  const [notes, setNotes] = useState([]);

  // Overwrite the entire notes array (e.g., after loading from server).
  const setAllNotes = useCallback((notesArray) => {
    setNotes(notesArray);
  }, []);

  // Add a new note to the existing array.
  const addNote = useCallback((note) => {
    setNotes(prev => [...prev, { id: generateId(), ...note }]);
  }, []);

  // Remove a note by id.
  const deleteNote = useCallback((id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  }, []);

  return {
    notes,       // the current array of notes
    setAllNotes, // new method to overwrite the entire array
    addNote,
    deleteNote
  };
}
