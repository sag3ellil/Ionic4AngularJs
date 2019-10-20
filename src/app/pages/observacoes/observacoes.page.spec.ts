import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacoesPage } from './observacoes.page';

describe('ObservacoesPage', () => {
  let component: ObservacoesPage;
  let fixture: ComponentFixture<ObservacoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservacoesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
