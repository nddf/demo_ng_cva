import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExempleTemplateComponent } from './exemple-template.component';

describe('ExempleTemplateComponent', () => {
  let component: ExempleTemplateComponent;
  let fixture: ComponentFixture<ExempleTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ExempleTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExempleTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
