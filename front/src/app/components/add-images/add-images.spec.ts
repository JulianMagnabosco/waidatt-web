import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImages } from './add-images';

describe('AddImages', () => {
  let component: AddImages;
  let fixture: ComponentFixture<AddImages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddImages],
    }).compileComponents();

    fixture = TestBed.createComponent(AddImages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
