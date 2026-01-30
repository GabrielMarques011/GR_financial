import { useState } from 'react';
import { CreditCard, Plus, Trash2, AlertCircle, Check, X } from 'lucide-react';
import { Debt } from '@/types/finance';
import { formatCurrency, formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';

interface DebtsSectionProps {
  debts: Debt[];
  totalDebts: number;
  onAddDebt: (description: string, value: number, category?: string) => void;
  onRemoveDebt: (id: string) => void;
  onTogglePaid?: (id: string) => void;
}

export function DebtsSection({ debts, totalDebts, onAddDebt, onRemoveDebt, onTogglePaid }: DebtsSectionProps) {
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

  // Separar dívidas pagas e não pagas
  const unpaidDebts = debts.filter(debt => !debt.isPaid);
  const paidDebts = debts.filter(debt => debt.isPaid);
  const totalUnpaid = unpaidDebts.reduce((sum, debt) => sum + debt.value, 0);
  const totalPaid = paidDebts.reduce((sum, debt) => sum + debt.value, 0);

  return (
    <div className="financial-card animate-slide-up overflow-hidden">
      {/* Header com gradiente sutil */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-danger/20 to-danger/10 shadow-sm">
            <CreditCard className="w-5 h-5 text-danger" />
          </div>
          <div>
            <h2 className="text-xl font-semibold font-display tracking-tight">Dívidas</h2>
          </div>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300',
            isAdding
              ? 'bg-muted text-muted-foreground hover:bg-muted/80'
              : 'bg-gradient-to-br from-danger/10 to-danger/5 text-danger hover:from-danger/20 hover:to-danger/10 border border-danger/20 hover:shadow-md'
          )}
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isAdding ? 'Cancelar' : 'Adicionar'}
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 p-5 rounded-xl bg-gradient-to-br from-muted/60 to-muted/40 border border-border/50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                Descrição
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-financial"
                placeholder="Ex: Fatura do cartão"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
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
            <label className="block text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              Categoria (opcional)
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(category === cat ? '' : cat)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    category === cat
                      ? 'bg-gradient-to-br from-danger to-danger/90 text-danger-foreground shadow-md scale-105'
                      : 'bg-muted text-muted-foreground hover:bg-danger/10 hover:text-danger border border-border/50 hover:border-danger/30'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <button 
            type="submit" 
            className="btn-danger w-full mt-5 shadow-md hover:shadow-lg hover:shadow-danger/20"
          >
            Adicionar Dívida
          </button>
        </form>
      )}

      {/* Debts List */}
      {debts.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex p-4 rounded-full bg-success/10 mb-4">
            <AlertCircle className="w-12 h-12 text-success/50" />
          </div>
          <p className="text-lg font-semibold text-foreground mb-1">Nenhuma dívida cadastrada</p>
          <p className="text-sm text-muted-foreground">Ótimo trabalho! Continue assim. 🎉</p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
          {debts.map((debt, index) => (
            <div
              key={debt.id}
              className={cn(
                "group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:shadow-md animate-slide-up",
                debt.isPaid
                  ? "bg-gradient-to-br from-success/5 to-success/10 border-success/20 opacity-70 hover:opacity-100"
                  : "bg-gradient-to-br from-muted/60 to-muted/40 border-border/50 hover:border-primary/30"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className={cn(
                    "font-semibold text-foreground truncate",
                    debt.isPaid && "line-through decoration-2 decoration-success/50"
                  )}>
                    {debt.description}
                  </p>
                  {debt.category && (
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                      debt.isPaid
                        ? "bg-success/20 text-success border-success/30 line-through"
                        : "bg-primary/20 text-primary border-primary/30"
                    )}>
                      {debt.category}
                    </span>
                  )}
                  {debt.isPaid && (
                    <span className="px-2 py-0.5 rounded-full bg-success text-success-foreground text-xs font-bold">
                      PAGO
                    </span>
                  )}
                </div>
                <p className={cn(
                  "text-xs text-muted-foreground font-medium",
                  debt.isPaid && "line-through"
                )}>
                  Adicionado em {formatDate(debt.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <span className={cn(
                  "text-lg font-bold font-display",
                  debt.isPaid 
                    ? "text-success line-through decoration-2" 
                    : "text-danger"
                )}>
                  {formatCurrency(debt.value)}
                </span>
                <div className="flex items-center gap-1.5">
                  {/* Botão de marcar/desmarcar como pago */}
                  {onTogglePaid && (
                    <button
                      onClick={() => onTogglePaid(debt.id)}
                      className={cn(
                        "p-2 rounded-lg transition-all duration-200 hover:scale-110",
                        debt.isPaid
                          ? "text-warning hover:text-warning hover:bg-warning/10"
                          : "text-muted-foreground hover:text-success hover:bg-success/10"
                      )}
                      title={debt.isPaid ? "Desmarcar como pago" : "Marcar como pago"}
                    >
                      {debt.isPaid ? (
                        <X className="w-4 h-4" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  )}
                  {/* Botão de remover */}
                  <button
                    onClick={() => onRemoveDebt(debt.id)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-all duration-200 hover:scale-110"
                    title="Remover dívida"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Total Section */}
      <div className="mt-6 pt-5 border-t border-border/50 space-y-3">
        {/* Total das Dívidas */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 shadow-sm">
          <span className="text-sm font-bold text-foreground uppercase tracking-wider">
            Total das Dívidas
          </span>
          <span className="text-1xl font-bold text-primary font-display tracking-tight">
            {formatCurrency(totalDebts)}
          </span>
        </div>

        {/* Total Pago - só aparece se tiver dívidas pagas */}
        {paidDebts.length > 0 && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Total Pago
            </span>
            <span className="text-xl font-bold text-success font-display tracking-tight">
              {formatCurrency(totalPaid)}
            </span>
          </div>
        )}
        
        {/* Estatísticas rápidas */}
        {debts.length > 0 && (
          <div className="mt-2 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-danger" />
              <span>{unpaidDebts.length} pendente{unpaidDebts.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>{paidDebts.length} paga{paidDebts.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}