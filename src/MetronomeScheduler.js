function validOrDefault(fn) {
  if (typeof fn === 'function') {
    return fn;
  }
  return () => {};
}

export default class MetronomeScheduler {
  constructor({ processTick, render, start, stop, }) {
    this.processTick = validOrDefault(processTick);
    this.start = validOrDefault(start);
    this.stop = validOrDefault(stop);
  }
}
