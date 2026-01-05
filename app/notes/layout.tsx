import type { NotesLayoutSlots } from '@/types/note';

export default function LayoutNotes({
  children,
  modal,
  sidebar,
}: NotesLayoutSlots) {
  return (
    <>
      {sidebar}
      {children}
      {modal}
    </>
  );
}
