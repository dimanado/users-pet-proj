import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBaseHeaderComponent } from './dialog-base-header.component';

describe('DialogBaseHeaderComponent', () => {
  let component: DialogBaseHeaderComponent;
  let fixture: ComponentFixture<DialogBaseHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogBaseHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogBaseHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
