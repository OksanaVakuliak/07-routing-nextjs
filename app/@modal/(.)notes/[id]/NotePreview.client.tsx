'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import noteService from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => noteService.fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading note</p>}

        {note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <span className={css.tag}>{note.tag}</span>
            </div>

            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>

            <button className={css.backBtn} onClick={handleClose}>
              ← Back
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
