import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-dialog-base-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dialog-base-header.component.html',
  styleUrl: './dialog-base-header.component.scss'
})
export class DialogBaseHeaderComponent {
  @Input() title!: string;

  @Output() close = new EventEmitter<void>();
}
