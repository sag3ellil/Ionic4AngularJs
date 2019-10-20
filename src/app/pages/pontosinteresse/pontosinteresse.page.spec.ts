import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PontosinteressePage } from './pontosinteresse.page';

describe('PontosinteressePage', () => {
  let component: PontosinteressePage;
  let fixture: ComponentFixture<PontosinteressePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PontosinteressePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PontosinteressePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
