import TimeSchedule from './TimeSchedule';
import buildTimerWorker from './TimerWorkerProvider';

const TICK = 'tick';
const LOOKAHEAD_TIME = 25;
const SCHEDULE_AHEAD_TIME = 100;

// quarter note = 60000ms / tempo implies 32nd note = (60 / 8) / tempo
const TICK_MULT = 60000 / 8;

export default class Metronome {
  constructor(noteScheduler) {
    this.noteScheduler = noteScheduler;
    this.nextTickSchedule = new TimeSchedule();
    this.lookahead = LOOKAHEAD_TIME;
    this.tempo = 120.0;
    this.isRunning = false;
    this.timerWorker = buildTimerWorker();
    this.timerWorker.addEventListener('message', this.handleTimerMessage.bind(this));
    this.timerWorker.postMessage({ interval: this.lookahead });
  }

  scheduler() {
    if (this.nextTickSchedule.timeStamp > performance.now() + SCHEDULE_AHEAD_TIME) {
      return;
    }
    this.noteScheduler.processTick(this.nextTickSchedule.clone());
    this.nextTickSchedule.add(this.getTickLength());
  }

  start() {
    if (this.isRunning) {
      // eslint-disable-next-line no-console
      console.log('Cannot start a running metronome');
      return;
    }
    const startTime = performance.now();
    this.nextTickSchedule.timeStamp = startTime;
    this.noteScheduler.start(startTime);
    this.timerWorker.postMessage('start');
    this.isRunning = true;
    document.dispatchEvent(new CustomEvent('METRONOME_START', { detail: { timestamp: startTime }, }));
  }

  stop() {
    this.noteScheduler.stop();
    this.timerWorker.postMessage('stop');
    this.isRunning = false;
    document.dispatchEvent(new CustomEvent('METRONOME_STOP', { detail: { timestamp: performance.now() }, }));
  }

  setTempo(tempo) {
    this.tempo = tempo;
  }

  getTempo() {
    return this.tempo;
  }

  getTickLength() {
    return TICK_MULT / this.tempo;
  }

  handleTimerMessage(event) {
    if (event.data === TICK) {
      this.scheduler();
    }
    // else {
    //   console.log('timerWorker message:', event.data);
    // }
  }
}
