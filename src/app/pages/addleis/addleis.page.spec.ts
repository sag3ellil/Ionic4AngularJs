import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddleisPage } from './addleis.page';

describe('AddleisPage', () => {
  let component: AddleisPage;
  let fixture: ComponentFixture<AddleisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddleisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddleisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
