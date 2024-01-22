import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notice',
  standalone: true,
  imports: [],
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.scss'
})
export class NoticeComponent {
  @Output() onClose = new EventEmitter();

  onNoticeClosed(): void {
    this.onClose.emit();
  }
}
