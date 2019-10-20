import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuvistoriasPage } from './menuvistorias.page';

describe('MenuvistoriasPage', () => {
  let component: MenuvistoriasPage;
  let fixture: ComponentFixture<MenuvistoriasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuvistoriasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuvistoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
