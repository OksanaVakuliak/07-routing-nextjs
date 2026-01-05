import NotesFilterClient from './Notes.client';

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const resolvedParams = await params;

  const selectedTag =
    resolvedParams.slug?.[0] === 'all' ? undefined : resolvedParams.slug?.[0];

  return <NotesFilterClient tag={selectedTag} />;
}
