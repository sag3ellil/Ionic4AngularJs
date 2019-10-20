import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuconsultasgeralPage } from './menuconsultasgeral.page';

describe('MenuconsultasgeralPage', () => {
  let component: MenuconsultasgeralPage;
  let fixture: ComponentFixture<MenuconsultasgeralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuconsultasgeralPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuconsultasgeralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
