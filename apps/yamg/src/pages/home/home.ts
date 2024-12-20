import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { YamgConfigService } from '../../app/yamg-config';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatAnchor, MatIcon, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  public readonly yamgConfig = inject(YamgConfigService);
}
