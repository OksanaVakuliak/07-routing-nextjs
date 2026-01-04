'use client';

import { useState } from 'react';
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { FetchNotesResponse } from '@/lib/api';
import noteService from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './NotesPage.module.css';

interface PageChangeEvent {
  selected: number;
}

export default function NotesClient() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const [page, setPage] = useState(1);
  const perPage = 12;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialData: FetchNotesResponse = { notes: [], totalPages: 0 };

  const {
    data = initialData,
    isLoading,
    isError,
  } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => noteService.fetchNotes(page, perPage, debouncedSearch),
    placeholderData: keepPreviousData,
    initialData,
  });

  const { notes, totalPages } = data;

  const handlePageChange = (selected: PageChangeEvent): void => {
    setPage(selected.selected + 1);
  };

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(value: string): void => {
            setSearch(value);
            setPage(1);
          }}
        />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page - 1}
            onPageChange={handlePageChange}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ['notes'] });
              setIsModalOpen(false);
            }}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
