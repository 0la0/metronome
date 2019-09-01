import Metronome from './Metronome';
import MetronomeScheduler from './MetronomeScheduler';
import Scheduler from './Scheduler';
import TimeSchedule from './TimeSchedule';

class MetronomeManager {
  constructor() {
    this._scheduler = new Scheduler();
    this._metronome = new Metronome(this._scheduler);
    this.id = Math.random();
  }

  register(schedulable) {
    return this._scheduler.register(schedulable);
  }

  deregister(schedulable) {
    return this._scheduler.deregister(schedulable);
  }

  start() {
    return this._metronome.start();
  }

  stop() {
    return this._metronome.stop();
  }

  isRunning() {
    return this._metronome.isRunning;
  }

  getTickLength() {
    return this._metronome.getTickLength();
  }

  setTempo(tempo) {
    return this._metronome.setTempo(tempo);
  }

  getTempo() {
    return this._metronome.getTempo();
  }
}

export {
  MetronomeManager,
  MetronomeScheduler,
  TimeSchedule
};
