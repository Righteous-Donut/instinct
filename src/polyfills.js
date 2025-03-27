import { Buffer } from 'buffer';

if (typeof global === 'undefined') {
  window.global = window;
}
global.Buffer = Buffer;
window.Buffer = Buffer;
