import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicoinfracaoPage } from './graphicoinfracao.page';

describe('GraphicoinfracaoPage', () => {
  let component: GraphicoinfracaoPage;
  let fixture: ComponentFixture<GraphicoinfracaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicoinfracaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicoinfracaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
