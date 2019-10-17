# Metronome
A precise lookahead event scheduler, based off Chris Wilson's [article](https://www.html5rocks.com/en/tutorials/audio/scheduling/). Time unit is in [milliseconds](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now).

## Build scripts
install dependencies: `npm install`  
run linter: `npm run lint`  
build: `npm run build`

---

## Usage
```js
import {
  MetronomeManager,
  MetronomeScheduler,
} from 'metronome';

const metronome = new MetronomeManager();

metronome.register(new MetronomeScheduler({
  start: () => console.log('metronome started'),
  stop: () => console.log('metrnome stopped'),
  processTick: (tickNumber, time) => console.log('handleTick')
}));

metronome.start();
```

### Metronome Scheduler
```js
const scheduler = new MetronomeScheduler({
  start: () => { /*  metrnome start callback */ },
  stop: () => { /*  metrnome stopped callback */ },
  processTick: (tickNumber, time) => {
    /*
      tickNumber = number of ticks (in 32nd notes) from the start event

      time = time (in performance.now milliseconds) to schedule event
      time will always be >= to performance.now()
    */
  },
})

```

### Metronome
```js
const scheduler = new MetronomeScheduler({});
const metronome = new MetronomeManager();

metronome.register(scheduler);  // subscribe to metronome events
metronome.deregister(scheduler);  // unsubscribe to metronome events

metronome.start(); // start the metronome
metronome.stop(); // stop the metronome

metronome.isRunning(); // returns a boolean

metronome.getTickLength(); // returns the duration of a tick (32nd note)

metronome.setTempo(tempo); // set the tempo (BPM), default is 120 BPM
metronome.setTempo(); // returns the tempo (BPM)
```

### Metronome Events
```js
// DOM events are emitted when the metronome is started and stopped;

document.addEventListener('METRONOME_START', event => console.log('metronome started at', event.detail.timestamp));
document.addEventListener('METRONOME_STOP', event => console.log('metronome stopped');
```
---

### Example: sync to audio clock
```js
class AudioClass {
  constructor() {
    this.audioContext = new AudioContext();
    this.startTimestamp = 0;
    document.addEventListener('METRONOME_START', (event) => {
      this.startTimestamp = (event.detail.timestamp / 1000) - this.audioContext.currentTime;
    });
  }

  getAudioTimeFromPerformanceTime(performanceTime) {
    return (performanceTime / 1000) - this.startTimestamp;
  }
}

const audio = new AudioClass();
const scheduler = new MetronomeScheduler({
  processTick: (tickNumber, time) => {
    const audioTime = audio.getAudioTimeFromPerformanceTime(time);
    // use `audioTime` to schedule audio events
  },
});
```

### Example: precise timing for MIDI events
```js
const scheduler = new MetronomeScheduler({
  processTick: (tickNumber, time) => {
    someMidiOutput.send([0x90, 60, 0x7f], time);
  },
});
```