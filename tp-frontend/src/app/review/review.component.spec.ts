import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { HttpClientModule } from '@angular/common/http';
import { ReviewService } from '../services/review.service';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewComponent],
      providers: [ReviewService],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(ReviewComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;

  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }) );
});
