import { useState } from 'react';
import { PiggyBank, Plus, Minus, TrendingUp, TrendingDown } from 'lucide-react';
import { Savings } from '@/types/finance';
import { formatCurrency, formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';

interface SavingsSectionProps {
  savings: Savings;
  onDeposit: (value: number) => void;
  onWithdraw: (value: number) => void;
}

export function SavingsSection({ savings, onDeposit, onWithdraw }: SavingsSectionProps) {
  const [action, setAction] = useState<'deposit' | 'withdraw' | null>(null);
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numValue = parseFloat(value);
    if (!numValue || numValue <= 0) return;

    if (action === 'deposit') {
      onDeposit(numValue);
    } else if (action === 'withdraw') {
      onWithdraw(numValue);
    }
    setValue('');
    setAction(null);
  };

  const recentTransactions = savings.transactions.slice(-5).reverse();

  return (
    <div className="financial-card animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10">
            <PiggyBank className="w-5 h-5 text-success" />
          </div>
          <h2 className="text-lg font-semibold font-display">Dinheiro Guardado</h2>
        </div>
      </div>

      {/* Total Display */}
      <div className="text-center py-6 mb-6 rounded-xl bg-gradient-to-br from-success/5 to-success/10 border border-success/20">
        <p className="text-sm text-muted-foreground mb-2">Total Guardado</p>
        <p className="text-4xl font-bold text-success font-display animate-number">
          {formatCurrency(savings.total)}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setAction(action === 'deposit' ? null : 'deposit')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all',
            action === 'deposit'
              ? 'bg-success text-success-foreground'
              : 'bg-success/10 text-success hover:bg-success/20'
          )}
        >
          <Plus className="w-4 h-4" />
          Depositar
        </button>
        <button
          onClick={() => setAction(action === 'withdraw' ? null : 'withdraw')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all',
            action === 'withdraw'
              ? 'bg-warning text-warning-foreground'
              : 'bg-warning/10 text-warning hover:bg-warning/20'
          )}
        >
          <Minus className="w-4 h-4" />
          Retirar
        </button>
      </div>

      {/* Action Form */}
      {action && (
        <form onSubmit={handleSubmit} className="mb-6 animate-fade-in">
          <div className="flex gap-2">
            <input
              type="number"
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="input-financial flex-1"
              placeholder="Digite o valor"
              autoFocus
            />
            <button
              type="submit"
              className={cn(
                'px-6 rounded-lg font-medium transition-all',
                action === 'deposit' ? 'btn-success' : 'bg-warning text-warning-foreground hover:opacity-90'
              )}
            >
              Confirmar
            </button>
          </div>
        </form>
      )}

      {/* Recent Transactions */}
      {recentTransactions.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Últimas Movimentações
          </h3>
          <div className="space-y-2">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  {transaction.type === 'deposit' ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-warning" />
                  )}
                  <div>
                    <p className="text-sm font-medium">
                      {transaction.type === 'deposit' ? 'Depósito' : 'Retirada'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(transaction.createdAt)}
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    'font-medium',
                    transaction.type === 'deposit' ? 'text-success' : 'text-warning'
                  )}
                >
                  {transaction.type === 'deposit' ? '+' : '-'}
                  {formatCurrency(transaction.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
