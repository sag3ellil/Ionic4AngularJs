import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BratPage } from './brat.page';

describe('BratPage', () => {
  let component: BratPage;
  let fixture: ComponentFixture<BratPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BratPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BratPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
