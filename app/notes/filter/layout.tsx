import type { NotesLayoutSlots } from '@/types/note';

export default function FilterLayout({
  children,
  sidebar,
  modal,
}: NotesLayoutSlots) {
  return (
    <>
      {sidebar}
      {children}
      {modal}
    </>
  );
}
