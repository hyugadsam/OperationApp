import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLogDetailComponent } from './team-log-detail.component';

describe('TeamLogDetailComponent', () => {
  let component: TeamLogDetailComponent;
  let fixture: ComponentFixture<TeamLogDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamLogDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
