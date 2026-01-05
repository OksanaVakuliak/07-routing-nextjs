import NotePreview from '@/app/notes/NotePreview.client';

interface ModalPageProps {
  params: Promise<{ id: string }>;
}

export default async function ModalPage({ params }: ModalPageProps) {
  const { id } = await params;

  return <NotePreview id={id} />;
}
