import { DollarSign, CreditCard, PiggyBank, TrendingUp, TrendingDown } from 'lucide-react';
import { useFinancialData } from '@/hooks/useFinancialData';
import { Header } from '@/components/Header';
import { StatCard } from '@/components/StatCard';
import { SalarySection } from '@/components/SalarySection';
import { DebtsSection } from '@/components/DebtsSection';
import { SavingsSection } from '@/components/SavingsSection';

const Index = () => {
  const {
    data,
    isLoaded,
    updateSalaries,
    addDebt,
    removeDebt,
    addToSavings,
    withdrawFromSavings,
    totalSalaries,
    totalDebts,
    toggleDebtPaid,
    totalSavings,
    balance,
  } = useFinancialData();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold font-display text-foreground mb-4">
            Visão Geral
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Salários"
              value={totalSalaries}
              icon={<DollarSign className="w-6 h-6" />}
              variant="primary"
              subtitle="Renda mensal do casal"
            />
            <StatCard
              title="Total Dívidas"
              value={totalDebts}
              icon={<CreditCard className="w-6 h-6" />}
              variant="danger"
              subtitle={`${data.debts.length} dívida(s) ativa(s)`}
            />
            <StatCard
              title="Dinheiro Guardado"
              value={totalSavings}
              icon={<PiggyBank className="w-6 h-6" />}
              variant="success"
              subtitle="Reserva financeira"
            />
            <StatCard
              title="Saldo Final"
              value={balance}
              icon={balance >= 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
              variant={balance >= 0 ? 'success' : 'danger'}
              subtitle="Salários - Dívidas + Guardado"
            />
          </div>
        </section>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <SalarySection
              userSalary={data.salaries.user}
              spouseSalary={data.salaries.spouse}
              totalSalaries={totalSalaries}
              onUpdate={updateSalaries}
            />
            <SavingsSection
              savings={data.savings}
              onDeposit={addToSavings}
              onWithdraw={withdrawFromSavings}
            />
          </div>

          {/* Right Column */}
          <div>
            <DebtsSection
              debts={data.debts}
              totalDebts={totalDebts}
              onAddDebt={addDebt}
              onRemoveDebt={removeDebt}
              onTogglePaid={toggleDebtPaid}
            />
          </div>
        </div>

        {/* Footer Info */}
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Os dados são salvos automaticamente no navegador.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
