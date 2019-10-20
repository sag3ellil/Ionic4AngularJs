import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeisPage } from './leis.page';

describe('LeisPage', () => {
  let component: LeisPage;
  let fixture: ComponentFixture<LeisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
