import { Wallet } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo e título */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-foreground">
                Controle Financeiro
              </h1>
              <p className="text-sm text-muted-foreground">
                Gestão financeira do casal
              </p>
            </div>
          </div>

          {/* Botão de tema */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}