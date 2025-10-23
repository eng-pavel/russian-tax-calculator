import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { AppliedBracket, TaxBracket } from '../../interfaces/tax-calculator.interface';
import { Card } from 'primeng/card';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Divider } from 'primeng/divider';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-tax-calculator',
  imports: [Card, InputNumber, FormsModule, Divider, Footer],
  templateUrl: './tax-calculator.html',
  styleUrl: './tax-calculator.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxCalculator {
  monthlySalary = signal<number | null>(null);

  private taxBrackets: TaxBracket[] = [
    { rate: 0.13, min: 0, max: 200000, description: 'до 200 тыс. руб./мес' },
    { rate: 0.15, min: 200000, max: 416667, description: '200-416.7 тыс. руб./мес' },
    { rate: 0.18, min: 416667, max: 1666667, description: '416.7 тыс. - 1.67 млн руб./мес' },
    { rate: 0.2, min: 1666667, max: 4166667, description: '1.67 млн - 4.17 млн руб./мес' },
    { rate: 0.22, min: 4166667, description: 'свыше 4.17 млн руб./мес' },
  ];

  appliedBrackets = computed<AppliedBracket[]>(() => {
    const salary = this.monthlySalary();
    if (!salary || salary <= 0) return [];

    const brackets: AppliedBracket[] = [];
    let remainingIncome = salary;

    for (const bracket of this.taxBrackets) {
      if (remainingIncome <= 0) break;

      const bracketMax = bracket.max || Infinity;
      const taxableInBracket = Math.min(remainingIncome, bracketMax - bracket.min);

      if (taxableInBracket > 0) {
        brackets.push({
          rate: bracket.rate,
          amount: taxableInBracket,
          tax: taxableInBracket * bracket.rate,
          description: bracket.description,
        });
        remainingIncome -= taxableInBracket;
      }
    }

    return brackets;
  });

  totalTax = computed(() => {
    return this.appliedBrackets().reduce((sum, bracket) => sum + bracket.tax, 0);
  });

  netSalary = computed(() => {
    const salary = this.monthlySalary();
    return salary ? salary - this.totalTax() : 0;
  });

  hasSalary = computed(() => {
    const salary = this.monthlySalary();
    return !!salary && salary > 0;
  });

  formatNumber(value: number): string {
    return new Intl.NumberFormat('ru-RU').format(Math.round(value));
  }

  onSalaryChange(value: number | null): void {
    this.monthlySalary.set(value || 0);
  }
}
