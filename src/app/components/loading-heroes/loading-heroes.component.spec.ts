import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingHeroesComponent } from './loading-heroes.component';

describe('LoadingHeroesComponent', () => {
  let component: LoadingHeroesComponent;
  let fixture: ComponentFixture<LoadingHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingHeroesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
