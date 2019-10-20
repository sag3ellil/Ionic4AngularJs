import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbairrosPage } from './addbairros.page';

describe('AddbairrosPage', () => {
  let component: AddbairrosPage;
  let fixture: ComponentFixture<AddbairrosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbairrosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbairrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
