interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onAddClick: () => void;
  onExportClick: () => void;
}

export default function Header({ darkMode, onToggleDarkMode, onAddClick, onExportClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b-2 border-stone-900 dark:border-stone-100 pb-3 mb-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">Ledger</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">Personal expense tracker</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleDarkMode}
          aria-label="Toggle dark mode"
          className="rounded-md border border-stone-300 dark:border-stone-600 text-sm px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          {darkMode ? "Light" : "Dark"}
        </button>
        <button
          onClick={onExportClick}
          className="rounded-md border border-stone-300 dark:border-stone-600 text-sm px-3 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          Export CSV
        </button>
        <button
          onClick={onAddClick}
          className="rounded-md bg-teal-700 text-white text-sm font-medium px-4 py-2 hover:bg-teal-800 transition-colors"
        >
          + Add transaction
        </button>
      </div>
    </header>
  );
}
