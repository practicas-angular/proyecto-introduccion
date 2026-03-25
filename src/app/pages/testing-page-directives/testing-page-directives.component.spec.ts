import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingPageDirectivesComponent } from './testing-page-directives.component';

describe('TestingPageDirectivesComponent', () => {
  let component: TestingPageDirectivesComponent;
  let fixture: ComponentFixture<TestingPageDirectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingPageDirectivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingPageDirectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
