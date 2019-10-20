import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagensPage } from './messagens.page';

describe('MessagensPage', () => {
  let component: MessagensPage;
  let fixture: ComponentFixture<MessagensPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagensPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
