'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import noteService from '@/lib/api';
import type { FetchNotesResponse } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';

interface NotesFilterClientProps {
  tag?: string;
}

export default function NotesFilterClient({ tag }: NotesFilterClientProps) {
  const perPage = 12;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<FetchNotesResponse>({
      queryKey: ['notes', tag],
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        noteService.fetchNotes(pageParam as number, perPage, undefined, tag),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage.totalPages ? nextPage : undefined;
      },
    });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(entries => {
      const first = entries[0];
      if (first.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (status === 'pending') return <p>Loading...</p>;
  if (status === 'error') return <p>Error loading notes</p>;

  const allNotes = data.pages.flatMap(page => page.notes);

  return (
    <>
      <NoteList notes={allNotes} />

      <div ref={loadMoreRef}>
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </>
  );
}
