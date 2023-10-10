export default class Timer {
  private duration: number;
  private remainingTime: number;
  private timerID: any;
  onTimeUp: () => void;

  constructor(duration: number, onTimeUp: () => void) {
    this.duration = duration;
    this.remainingTime = duration;
    this.onTimeUp = onTimeUp;
  }

  start() {
    this.timerID = setInterval(() => {
      this.remainingTime--;

      if (this.remainingTime <= 0) {
        this.stop();
        this.onTimeUp();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.timerID);
  }

  reset() {
    this.stop();
    this.remainingTime = this.duration;
  }

  getRemainingTime() {
    return this.remainingTime;
  }
}
