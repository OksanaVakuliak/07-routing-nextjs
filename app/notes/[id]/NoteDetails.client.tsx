'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, notFound } from 'next/navigation';
import noteService from '@/lib/api';
import type { Note } from '@/types/note';
import css from './NoteDetails.module.css';

interface NoteDetailsClientProps {
  id?: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const params = useParams();
  const noteId = id ?? (params?.id as string);

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => noteService.fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return notFound();

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}
