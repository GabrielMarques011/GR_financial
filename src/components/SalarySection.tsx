import { useState, useEffect } from 'react';
import { User, Users, DollarSign, Check, Edit2 } from 'lucide-react';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';

interface SalarySectionProps {
  userSalary: number;
  spouseSalary: number;
  totalSalaries: number;
  onUpdate: (userSalary: number, spouseSalary: number) => void;
}

export function SalarySection({ userSalary, spouseSalary, totalSalaries, onUpdate }: SalarySectionProps) {
  const [editUser, setEditUser] = useState(false);
  const [editSpouse, setEditSpouse] = useState(false);
  const [userValue, setUserValue] = useState(userSalary.toString());
  const [spouseValue, setSpouseValue] = useState(spouseSalary.toString());

  useEffect(() => {
    setUserValue(userSalary.toString());
    setSpouseValue(spouseSalary.toString());
  }, [userSalary, spouseSalary]);

  const handleSaveUser = () => {
    const value = parseFloat(userValue) || 0;
    onUpdate(value, spouseSalary);
    setEditUser(false);
  };

  const handleSaveSpouse = () => {
    const value = parseFloat(spouseValue) || 0;
    onUpdate(userSalary, value);
    setEditSpouse(false);
  };

  return (
    <div className="financial-card animate-slide-up overflow-hidden">
      {/* Header com gradiente sutil */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-sm">
          <DollarSign className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold font-display tracking-tight">Salários</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* User Salary */}
        <div className="group relative p-5 rounded-xl bg-gradient-to-br from-muted/60 to-muted/40 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-background/80">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Gabriel</span>
            </div>
            {!editUser && (
              <button
                onClick={() => setEditUser(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-background/60"
              >
                <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            )}
          </div>
          
          {editUser ? (
            <div className="flex gap-2 animate-in fade-in duration-200">
              <input
                type="number"
                value={userValue}
                onChange={(e) => setUserValue(e.target.value)}
                className="input-financial flex-1 text-lg font-semibold"
                placeholder="0,00"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleSaveUser()}
              />
              <button
                onClick={handleSaveUser}
                className="p-3 rounded-lg bg-gradient-to-br from-success to-success/90 text-success-foreground hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <Check className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditUser(true)}
              className="w-full text-left group-hover:translate-x-1 transition-transform duration-200"
            >
              <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors font-display">
                {formatCurrency(userSalary)}
              </span>
            </button>
          )}
        </div>

        {/* Spouse Salary */}
        <div className="group relative p-5 rounded-xl bg-gradient-to-br from-muted/60 to-muted/40 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-background/80">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Gatinha</span>
            </div>
            {!editSpouse && (
              <button
                onClick={() => setEditSpouse(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-background/60"
              >
                <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            )}
          </div>
          
          {editSpouse ? (
            <div className="flex gap-2 animate-in fade-in duration-200">
              <input
                type="number"
                value={spouseValue}
                onChange={(e) => setSpouseValue(e.target.value)}
                className="input-financial flex-1 text-lg font-semibold"
                placeholder="0,00"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleSaveSpouse()}
              />
              <button
                onClick={handleSaveSpouse}
                className="p-3 rounded-lg bg-gradient-to-br from-success to-success/90 text-success-foreground hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <Check className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditSpouse(true)}
              className="w-full text-left group-hover:translate-x-1 transition-transform duration-200"
            >
              <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors font-display">
                {formatCurrency(spouseSalary)}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Total com destaque visual */}
      {/* <div className="mt-6 pt-5 border-t border-border/50">
        <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Total dos Salários
          </span>
          <span className="text-2xl font-bold text-primary font-display tracking-tight">
            {formatCurrency(totalSalaries)}
          </span>
        </div>
      </div> */}
    </div>
  );
}