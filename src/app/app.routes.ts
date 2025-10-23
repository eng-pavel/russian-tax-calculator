import { Routes } from '@angular/router';
import { TaxCalculator } from './components/tax-calculator/tax-calculator';

export const routes: Routes = [
  { path: '', component: TaxCalculator },
  { path: 'calculator', component: TaxCalculator },
  { path: '**', redirectTo: '' },
];
