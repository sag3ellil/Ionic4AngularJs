import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenutermosPage } from './menutermos.page';

describe('MenutermosPage', () => {
  let component: MenutermosPage;
  let fixture: ComponentFixture<MenutermosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenutermosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenutermosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
