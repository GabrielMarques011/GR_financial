import { useState } from 'react';
import { CreditCard, Plus, Trash2, AlertCircle } from 'lucide-react';
import { Debt } from '@/types/finance';
import { formatCurrency, formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';

interface DebtsSectionProps {
  debts: Debt[];
  totalDebts: number;
  onAddDebt: (description: string, value: number, category?: string) => void;
  onRemoveDebt: (id: string) => void;
}

export function DebtsSection({ debts, totalDebts, onAddDebt, onRemoveDebt }: DebtsSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !value) return;
    
    onAddDebt(description, parseFloat(value), category || undefined);
    setDescription('');
    setValue('');
    setCategory('');
    setIsAdding(false);
  };

  const categories = ['Cartão de Crédito', 'Empréstimo', 'Financiamento', 'Conta', 'Outros'];

  return (
    <div className="financial-card animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-danger/10">
            <CreditCard className="w-5 h-5 text-danger" />
          </div>
          <h2 className="text-lg font-semibold font-display">Dívidas</h2>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all',
            isAdding
              ? 'bg-muted text-muted-foreground'
              : 'bg-danger/10 text-danger hover:bg-danger/20'
          )}
        >
          <Plus className="w-4 h-4" />
          {isAdding ? 'Cancelar' : 'Adicionar'}
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 rounded-lg bg-muted/50 animate-fade-in">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Descrição
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-financial"
                placeholder="Ex: Fatura do cartão"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Valor
              </label>
              <input
                type="number"
                step="0.01"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="input-financial"
                placeholder="0,00"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Categoria (opcional)
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(category === cat ? '' : cat)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                    category === cat
                      ? 'bg-danger text-danger-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-danger/10 hover:text-danger'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="btn-danger w-full mt-4">
            Adicionar Dívida
          </button>
        </form>
      )}

      {/* Debts List */}
      {debts.length === 0 ? (
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">Nenhuma dívida cadastrada</p>
          <p className="text-sm text-muted-foreground/70">Ótimo trabalho! Continue assim.</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {debts.map((debt, index) => (
            <div
              key={debt.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground truncate">{debt.description}</p>
                  {debt.category && (
                    <span className="badge-danger text-xs">{debt.category}</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Adicionado em {formatDate(debt.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-danger">
                  {formatCurrency(debt.value)}
                </span>
                <button
                  onClick={() => onRemoveDebt(debt.id)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-all"
                  title="Remover dívida"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Total */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Total das Dívidas</span>
          <span className="text-xl font-bold text-danger font-display">
            {formatCurrency(totalDebts)}
          </span>
        </div>
      </div>
    </div>
  );
}
