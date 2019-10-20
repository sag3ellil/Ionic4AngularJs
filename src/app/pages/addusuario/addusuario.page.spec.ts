import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddusuarioPage } from './addusuario.page';

describe('AddusuarioPage', () => {
  let component: AddusuarioPage;
  let fixture: ComponentFixture<AddusuarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddusuarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddusuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
