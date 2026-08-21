import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit, OnDestroy {

  currentTime = '';

  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.updateClock();

    this.timer = setInterval(() => {
      this.updateClock();
    }, 30000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  updateClock(): void {

    const now = new Date();

    this.currentTime =
      now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short'
      }) +
      ' · ' +
      now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      });
  }
}
