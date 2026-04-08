import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { provideHttpClient } from '@angular/common/http';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent], 
      // Aquí es donde solucionamos el error de "NullInjector"
      providers: [
        provideHttpClient(),        // Provee el cliente HTTP
        provideHttpClient()  // Provee la herramienta de tests de HTTP
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
