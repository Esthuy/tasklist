import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOneTaskComponent } from './display-one-task.component';

describe('DisplayOneTaskComponent', () => {
  let component: DisplayOneTaskComponent;
  let fixture: ComponentFixture<DisplayOneTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayOneTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOneTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
