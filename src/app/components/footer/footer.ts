import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {}
