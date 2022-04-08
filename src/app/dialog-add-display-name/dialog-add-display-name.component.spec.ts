import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddDisplayNameComponent } from './dialog-add-display-name.component';

describe('DialogAddDisplayNameComponent', () => {
  let component: DialogAddDisplayNameComponent;
  let fixture: ComponentFixture<DialogAddDisplayNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddDisplayNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddDisplayNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
