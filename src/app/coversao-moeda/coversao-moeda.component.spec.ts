import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoversaoMoedaComponent } from './coversao-moeda.component';

describe('CoversaoMoedaComponent', () => {
  let component: CoversaoMoedaComponent;
  let fixture: ComponentFixture<CoversaoMoedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoversaoMoedaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoversaoMoedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
