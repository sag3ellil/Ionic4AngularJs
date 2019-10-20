import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenumedidasPage } from './menumedidas.page';

describe('MenumedidasPage', () => {
  let component: MenumedidasPage;
  let fixture: ComponentFixture<MenumedidasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenumedidasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenumedidasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
