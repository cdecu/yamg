import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import 'prismjs';
import 'prismjs/components/prism-sql';

@Component({
  selector: 'yamg-help',
  imports: [MarkdownComponent],
  templateUrl: './help.html',
  styleUrl: './help.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpPageComponent {}
