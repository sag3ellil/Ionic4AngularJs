import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmessagenPage } from './addmessagen.page';

describe('AddmessagenPage', () => {
  let component: AddmessagenPage;
  let fixture: ComponentFixture<AddmessagenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmessagenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmessagenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
