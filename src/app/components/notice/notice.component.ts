import { Component, EventEmitter, Output } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-notice',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.scss'
})
export class NoticeComponent {
  @Output() onClose = new EventEmitter();
  readonly X = X;

  onNoticeClosed(): void {
    this.onClose.emit();
  }
}
