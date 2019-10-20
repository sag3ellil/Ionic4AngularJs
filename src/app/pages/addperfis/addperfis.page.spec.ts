import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddperfisPage } from './addperfis.page';

describe('AddperfisPage', () => {
  let component: AddperfisPage;
  let fixture: ComponentFixture<AddperfisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddperfisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddperfisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
