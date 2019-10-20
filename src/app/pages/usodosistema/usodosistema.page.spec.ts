import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsodosistemaPage } from './usodosistema.page';

describe('UsodosistemaPage', () => {
  let component: UsodosistemaPage;
  let fixture: ComponentFixture<UsodosistemaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsodosistemaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsodosistemaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
