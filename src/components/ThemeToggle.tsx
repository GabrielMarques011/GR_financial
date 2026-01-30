import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative flex items-center justify-center w-14 h-14 rounded-xl',
        'bg-gradient-to-br transition-all duration-300 hover:scale-105',
        'border shadow-md overflow-hidden group',
        isDark
          ? 'from-slate-800 to-slate-900 border-slate-700 hover:shadow-blue-500/20'
          : 'from-amber-100 to-orange-100 border-orange-200 hover:shadow-orange-500/20'
      )}
      aria-label="Alternar tema"
      title={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
    >
      {/* Ícone do Sol */}
      <Sun
        className={cn(
          'absolute w-6 h-6 text-orange-500 transition-all duration-500',
          isDark
            ? 'rotate-90 scale-0 opacity-0'
            : 'rotate-0 scale-100 opacity-100 group-hover:rotate-12'
        )}
      />

      {/* Ícone da Lua */}
      <Moon
        className={cn(
          'absolute w-6 h-6 text-blue-400 transition-all duration-500',
          isDark
            ? 'rotate-0 scale-100 opacity-100 group-hover:-rotate-12'
            : '-rotate-90 scale-0 opacity-0'
        )}
      />

      {/* Efeito de brilho no hover */}
      <div
        className={cn(
          'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          isDark
            ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
            : 'bg-gradient-to-br from-yellow-300/20 to-orange-300/20'
        )}
      />
    </button>
  );
}