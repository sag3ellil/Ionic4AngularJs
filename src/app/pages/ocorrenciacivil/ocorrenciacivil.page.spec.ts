import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorrenciacivilPage } from './ocorrenciacivil.page';

describe('OcorrenciacivilPage', () => {
  let component: OcorrenciacivilPage;
  let fixture: ComponentFixture<OcorrenciacivilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcorrenciacivilPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcorrenciacivilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
