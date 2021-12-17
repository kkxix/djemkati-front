/* eslint-disable array-callback-return */
import React, { useRef } from 'react';
import iris from './iris';
import range from './range';

import useIncrementingNumber from './useIncrementingNumber.hook';

var _ = require('lodash');

const rainbowColors = iris(15, .5);
const paletteSize = rainbowColors.length;
const WINDOW_SIZE = 3;

// During compile-time build, we have to assume no browser support.
// On mount, we'll check if `CSS.registerProperty` exists
const hasBrowserSupport =
  typeof window !== 'undefined'
    ? typeof window.CSS.registerProperty === 'function'
    : false;

const getColorPropName = (id, index) => `--magic-rainbow-color-${id}-${index}`;


const useRainbow = ({ intervalDelay = 1000 }) => {

  const { current: uniqueId } = useRef(_.uniqueId());


  const prefersReducedMotion =
    typeof window === 'undefined'
      ? true
      : window.matchMedia('(prefers-reduced-motion: no-preference)');

  const isEnabled = hasBrowserSupport && prefersReducedMotion.matches;

  // Register all custom properties
  React.useEffect(() => {
    if (!isEnabled) {
      return;
    }

    for(let i = 0; i < WINDOW_SIZE; i++) {
      const name = getColorPropName(uniqueId, i);

      CSS.registerProperty({
        name,
        initialValue: rainbowColors[i],
        syntax: '<color>',
        inherits: false,
      });
    };
  }, [WINDOW_SIZE, isEnabled]);

  const intervalCount = useIncrementingNumber(intervalDelay);

  return range(0, WINDOW_SIZE).reduce((acc, index) => {
    const effectiveIntervalCount = isEnabled ? intervalCount : 0;

    const name = getColorPropName(uniqueId, index);
    const value = rainbowColors[(effectiveIntervalCount + index) % paletteSize];

    return {
      ...acc,
      [name]: value,
    };
  }, {});
};

export default useRainbow;