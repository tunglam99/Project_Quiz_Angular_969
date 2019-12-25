import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoExamComponent } from './do-exam.component';

describe('DoExamComponent', () => {
  let component: DoExamComponent;
  let fixture: ComponentFixture<DoExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
