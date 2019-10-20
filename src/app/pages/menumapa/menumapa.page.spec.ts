import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenumapaPage } from './menumapa.page';

describe('MenumapaPage', () => {
  let component: MenumapaPage;
  let fixture: ComponentFixture<MenumapaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenumapaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenumapaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
