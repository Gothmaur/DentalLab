import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioDialogComponent } from './Inventarios-dialog.component';

describe('InventarioDialogComponent', () => {
  let component: InventarioDialogComponent;
  let fixture: ComponentFixture<InventarioDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioDialogComponent]
    });
    fixture = TestBed.createComponent(InventarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
