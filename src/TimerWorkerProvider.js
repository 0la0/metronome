import workerString from './Timer.worker';

export default function buildWorker() {
  const workerUrl = URL.createObjectURL(new Blob([workerString]));
  return new Worker(workerUrl);
}
