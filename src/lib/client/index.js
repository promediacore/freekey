import { writable } from 'svelte/store'
import { u } from 'unist-builder'

export const roll = (min,max) => Math.random() * (max - min) + min

export const player = writable({
  pixels: [
    {
      x: 0,
      y: 0,
      r: 255,
      g: 255,
      b: 255,
      a: 1,
    },
    {
      x: 0,
      y: 1,
      r: 50,
      g: 50,
      b: 50,
      a: 0.5
    },
    {
      x: 1,
      y: 0,
      r: 50,
      g: 50,
      b: 50,
      a: 0.5
    },
    {
      x: 2,
      y: 0,
      r: 50,
      g: 50,
      b: 50,
      a: 0.5
    },
    {
      x: 2,
      y: 1,
      r: 50,
      g: 50,
      b: 50,
      a: 0.5
    },
  ],
  idle: true,
  dragging: false,
  mouse: null,
  select: null
})

export const pixels = writable([

])
