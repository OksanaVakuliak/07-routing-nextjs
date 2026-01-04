export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface CreateNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface NotesLayoutSlots {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  modal?: React.ReactNode;
}
