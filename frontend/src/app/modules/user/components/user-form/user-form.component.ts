import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { User } from '@app/core/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit {
  userForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    lastName: new FormControl<string | null>(null, [Validators.required]),
    age: new FormControl<number | null>(null, [Validators.required]),
    height: new FormControl<number | null>(null, [Validators.required]),
    weight: new FormControl<number | null>(null, [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent, User>,
    @Inject(MAT_DIALOG_DATA) public data: { user?: User },
  ) {
  }

  ngOnInit() {
    if (this.data.user) {
      this.userForm.patchValue({ ...this.data.user });
    }
  }

  onSubmit(): void {
    this.dialogRef.close(new User({ id: this.data.user?.id, ...this.userForm.value } as User));
    this.userForm.reset();
  }
}
