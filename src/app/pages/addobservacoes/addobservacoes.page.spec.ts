import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddobservacoesPage } from './addobservacoes.page';

describe('AddobservacoesPage', () => {
  let component: AddobservacoesPage;
  let fixture: ComponentFixture<AddobservacoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddobservacoesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddobservacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
