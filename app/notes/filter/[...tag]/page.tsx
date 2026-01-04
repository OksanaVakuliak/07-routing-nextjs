import NotesFilterClient from './NotesFilter.client';

interface FilterPageProps {
  params: Promise<{ tag: string[] }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { tag } = await params;

  const selectedTag = tag?.[0] === 'all' ? undefined : tag?.[0];

  return <NotesFilterClient tag={selectedTag} />;
}
