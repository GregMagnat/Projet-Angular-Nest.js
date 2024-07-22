import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-video-modal',
  template: `
    <div class="modal-content">
      <iframe
        src="https://www.instagram.com/reel/C24gpqmtRa7/embed"
        frameborder="0"
        allowfullscreen
        class="modal-iframe"
      ></iframe>
    </div>
  `,
  styleUrl: './video-modal.component.css',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class VideoModalComponent {
  constructor(public dialogRef: MatDialogRef<VideoModalComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
