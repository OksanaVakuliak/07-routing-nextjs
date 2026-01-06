import type { NotesLayoutSlots } from '@/types/note';
import css from '../LayoutNotes.module.css';

export default function FilterLayout({ children, sidebar }: NotesLayoutSlots) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  );
}
