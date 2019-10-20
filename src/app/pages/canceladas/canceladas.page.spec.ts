import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceladasPage } from './canceladas.page';

describe('CanceladasPage', () => {
  let component: CanceladasPage;
  let fixture: ComponentFixture<CanceladasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanceladasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceladasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
