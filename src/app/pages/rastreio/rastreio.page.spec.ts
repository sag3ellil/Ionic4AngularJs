import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RastreioPage } from './rastreio.page';

describe('RastreioPage', () => {
  let component: RastreioPage;
  let fixture: ComponentFixture<RastreioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RastreioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RastreioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
