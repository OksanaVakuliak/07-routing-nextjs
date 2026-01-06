import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import noteService, { FetchNotesResponse } from '@/lib/api';
import NotesClient from './Notes.client';

interface NotePageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesPage({ params }: NotePageProps) {
  const { slug } = await params;
  const tag = slug?.length && slug[0] !== 'all' ? slug[0] : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<FetchNotesResponse>({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => noteService.fetchNotes(1, 12, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
