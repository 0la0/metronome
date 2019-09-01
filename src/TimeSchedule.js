export default class TimeSchedule {
  constructor(timeStamp = 0) {
    this.timeStamp = timeStamp;
  }

  add(delta) {
    this.timeStamp = this.timeStamp + delta;
    return this;
  }

  copy(timeSchedule) {
    if (!(timeSchedule instanceof TimeSchedule)) {
      throw new Error('TimeSchedule.copy can only copy TimeSchedule', timeSchedule);
    }
    this.timeStamp = timeSchedule.timeStamp;
  }

  clone() {
    return new TimeSchedule(this.timeStamp);
  }
}
