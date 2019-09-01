
export default class Scheduler {
  constructor() {
    this.schedulables = new Set();
    this.isRunning = false;
    this.resetCounterVariables();
  }

  resetCounterVariables() {
    this.tickCounter = 0;
  }

  processTick(time) {
    this.schedulables.forEach(schedulable => schedulable.processTick(this.tickCounter, time));
    this.tickCounter++;
  }

  register(schedulable) {
    this.schedulables.add(schedulable);
  }

  deregister(schedulable) {
    this.schedulables.delete(schedulable);
  }

  start(startTimestamp) {
    this.tickCounter = 0;
    this.isRunning = true;
    this.schedulables.forEach(schedulable => schedulable.start(startTimestamp));
  }

  stop() {
    this.isRunning = false;
    this.resetCounterVariables();
  }
}
