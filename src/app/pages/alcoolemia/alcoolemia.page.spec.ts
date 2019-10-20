import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoolemiaPage } from './alcoolemia.page';

describe('AlcoolemiaPage', () => {
  let component: AlcoolemiaPage;
  let fixture: ComponentFixture<AlcoolemiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlcoolemiaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcoolemiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
