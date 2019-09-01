import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditroomPage } from './editroom.page';

describe('EditroomPage', () => {
  let component: EditroomPage;
  let fixture: ComponentFixture<EditroomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditroomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
