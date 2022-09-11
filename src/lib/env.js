import { readable } from 'svelte/store';

export const ENV = readable(null, function start(set) {
    set( {
      DEMO: import.meta.env.VITE_DEMO,
      DEV: import.meta.env.DEV,
      PROD: import.meta.env.PROD,
      MODE: import.meta.env.MODE
    });
    return function stop () {};
});