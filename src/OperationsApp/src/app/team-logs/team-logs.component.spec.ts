import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLogsComponent } from './team-logs.component';

describe('TeamLogsComponent', () => {
  let component: TeamLogsComponent;
  let fixture: ComponentFixture<TeamLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
