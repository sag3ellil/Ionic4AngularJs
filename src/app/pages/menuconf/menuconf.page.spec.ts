import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuconfPage } from './menuconf.page';

describe('MenuconfPage', () => {
  let component: MenuconfPage;
  let fixture: ComponentFixture<MenuconfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuconfPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuconfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
