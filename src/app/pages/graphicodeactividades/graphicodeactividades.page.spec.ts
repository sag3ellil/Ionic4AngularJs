import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicodeactividadesPage } from './graphicodeactividades.page';

describe('GraphicodeactividadesPage', () => {
  let component: GraphicodeactividadesPage;
  let fixture: ComponentFixture<GraphicodeactividadesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicodeactividadesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicodeactividadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
