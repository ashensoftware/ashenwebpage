export const COLORS = {
  PRIMARY: '#9d3dff',
  SECONDARY: '#5d61d0',
  ACCENT: '#ff69b4',
  WHITE: '#ffffff',
  BACKGROUND: '#010014',
  BACKGROUND_DARK: 'rgba(1, 0, 20, 0.95)',
} as const;

export const ANIMATION_CONFIG = {
  FALLING_PARTICLES: {
    COUNT: 35,
    MIN_SIZE: 1.5,
    MAX_SIZE: 3.5,
    MIN_SPEED: 0.1,
    MAX_SPEED: 0.3,
    COLORS: [
      'rgba(157, 61, 255, 0.6)',
      'rgba(93, 97, 208, 0.6)',
      'rgba(188, 122, 255, 0.4)',
      'rgba(255, 255, 255, 0.3)',
    ],
  },
  CLICK_SPARK: {
    PARTICLE_COUNT: 8,
    COLORS: ['#ffffff'],
    MIN_SIZE: 1,
    MAX_SIZE: 2.5,
    MIN_SPEED: 1,
    MAX_SPEED: 3,
    GRAVITY: 0.03,
    FRICTION: 0.95,
  },
} as const;

export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1200,
} as const;

export const Z_INDEX = {
  BACKGROUND: 0,
  WAVES: 1,
  PARTICLES: 5,
  CONTENT: 15,
  SPARK: 9999,
} as const;
