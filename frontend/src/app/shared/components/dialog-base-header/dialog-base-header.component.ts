import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/shared/material.module';

@Component({
  selector: 'app-dialog-base-header',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './dialog-base-header.component.html',
  styleUrl: './dialog-base-header.component.scss'
})
export class DialogBaseHeaderComponent {
  @Input() title!: string;

  @Output() close = new EventEmitter<void>();
}
