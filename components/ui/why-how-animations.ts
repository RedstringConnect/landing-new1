export const chartRadarFrames = [
  [3, 10, 17, 24],
  [6, 12, 18, 24],
  [24, 25, 26, 27, 12],
  [24, 32, 40, 48, 12],
  [24, 31, 38, 45, 12],
  [24, 30, 36, 42, 12],
  [21, 22, 23, 24, 12, 36],
  [0, 8, 16, 24, 12, 36],
  [3, 10, 17, 24, 12, 36],
  [6, 12, 18, 24, 36],
  [24, 25, 26, 27, 36],
  [24, 32, 40, 48, 36],
  [24, 31, 38, 45],
  [24, 30, 36, 42],
  [21, 22, 23, 24],
  [0, 8, 16, 24]
];

export const hourglassFrames = [
  // Normal top filled
  [0,1,2,3,4,5,6, 8,12, 16,18, 24, 30,32, 36,40, 42,43,44,45,46,47,48, 9,10,11,17],
  // Sand draining (1)
  [0,1,2,3,4,5,6, 8,12, 16,18, 24, 30,32, 36,40, 42,43,44,45,46,47,48, 9,11, 38],
  // Sand draining (2)
  [0,1,2,3,4,5,6, 8,12, 16,18, 24, 30,32, 36,40, 42,43,44,45,46,47,48, 37,38,39],
  // Squished vertically (flip start)
  [7,8,9,10,11,12,13, 15,19, 24, 29,33, 35,36,37,38,39,40,41, 30,31,32],
  // Horizontal line (flip mid)
  [21,22,23,24,25,26,27],
  // Squished vertically (flip end)
  [7,8,9,10,11,12,13, 15,19, 24, 29,33, 35,36,37,38,39,40,41, 16,17,18],
  // Normal top filled again
  [0,1,2,3,4,5,6, 8,12, 16,18, 24, 30,32, 36,40, 42,43,44,45,46,47,48, 9,10,11,17]
];

const drawPlayButton = (startCol: number) => {
  const baseButton = [
    // [row, col]
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0],
    [2, 1], [3, 1], [4, 1],
    [3, 2]
  ];
  return baseButton.map(([r, c]) => {
    const newC = c + startCol;
    if (newC >= 0 && newC < 7) {
      return r * 7 + newC;
    }
    return -1;
  }).filter(i => i !== -1);
};

const getShiftedPlayButtons = (offset: number) => {
  return [
    ...drawPlayButton(-8 + offset),
    ...drawPlayButton(-4 + offset),
    ...drawPlayButton(0 + offset),
    ...drawPlayButton(4 + offset),
  ];
};

export const chevronFrames = [
  getShiftedPlayButtons(0),
  getShiftedPlayButtons(1),
  getShiftedPlayButtons(2),
  getShiftedPlayButtons(3),
  getShiftedPlayButtons(4),
];

export const crosshairFrames = [
  // Outer dots
  [0, 6, 42, 48],
  [8, 12, 36, 40],
  [16, 20, 28, 32],
  // Crosshair outline
  [3, 10, 17, 24, 31, 38, 45, 21, 22, 23, 25, 26, 27],
  // Pulse 1
  [3, 10, 17, 24, 31, 38, 45, 21, 22, 23, 25, 26, 27, 16, 18, 30, 32],
  // Pulse 2
  [3, 10, 17, 24, 31, 38, 45, 21, 22, 23, 25, 26, 27, 8, 12, 36, 40],
  // Crosshair outline
  [3, 10, 17, 24, 31, 38, 45, 21, 22, 23, 25, 26, 27]
];

export const sliderFrames = [
  // Tracks: 1, 8, 15, 22, 29, 36, 43
  // Slider 1 (col 1): knob at 36 (row 5)
  // Slider 2 (col 3): knob at 17 (row 2)
  // Slider 3 (col 5): knob at 33 (row 4)
  [1, 8, 15, 22, 29, 36, 43, 35,37,  3, 10, 17, 24, 31, 38, 45, 16,18,  5, 12, 19, 26, 33, 40, 47, 32,34],
  // S1 up, S2 down, S3 up
  [1, 8, 15, 22, 29, 36, 43, 28,30,  3, 10, 17, 24, 31, 38, 45, 23,25,  5, 12, 19, 26, 33, 40, 47, 26,28], // wait 26 is col 5, row 3 col 5 is 26, knobs are left/right of track
  // Re-map properly
];

// Let's manually map slider frames perfectly
// col 1: 1, 8, 15, 22, 29, 36, 43
// col 3: 3, 10, 17, 24, 31, 38, 45
// col 5: 5, 12, 19, 26, 33, 40, 47
const track = [1,8,15,22,29,36,43, 3,10,17,24,31,38,45, 5,12,19,26,33,40,47];
const getSliderKnob = (col: number, row: number) => [row*7 + col - 1, row*7 + col, row*7 + col + 1];

export const slidersFramesMapped = [
  [...track, ...getSliderKnob(1, 5), ...getSliderKnob(3, 2), ...getSliderKnob(5, 4)],
  [...track, ...getSliderKnob(1, 4), ...getSliderKnob(3, 3), ...getSliderKnob(5, 3)],
  [...track, ...getSliderKnob(1, 3), ...getSliderKnob(3, 4), ...getSliderKnob(5, 2)],
  [...track, ...getSliderKnob(1, 2), ...getSliderKnob(3, 5), ...getSliderKnob(5, 1)],
  [...track, ...getSliderKnob(1, 1), ...getSliderKnob(3, 6), ...getSliderKnob(5, 2)],
  [...track, ...getSliderKnob(1, 2), ...getSliderKnob(3, 5), ...getSliderKnob(5, 3)],
  [...track, ...getSliderKnob(1, 3), ...getSliderKnob(3, 4), ...getSliderKnob(5, 4)],
  [...track, ...getSliderKnob(1, 4), ...getSliderKnob(3, 3), ...getSliderKnob(5, 5)],
  [...track, ...getSliderKnob(1, 5), ...getSliderKnob(3, 2), ...getSliderKnob(5, 4)],
];

export const mathFrames = [
  // +
  [22, 23, 24, 25, 26, 10, 17, 31, 38],
  [22, 23, 24, 25, 26, 10, 17, 31, 38],
  // -
  [22, 23, 24, 25, 26],
  [22, 23, 24, 25, 26],
  // x
  [8, 16, 24, 32, 40, 12, 18, 30, 36],
  [8, 16, 24, 32, 40, 12, 18, 30, 36],
  // %
  [40, 32, 24, 16, 8, 9, 39],
  [40, 32, 24, 16, 8, 9, 39],
  // =
  [16, 17, 18, 19, 20, 30, 31, 32, 33, 34],
  [16, 17, 18, 19, 20, 30, 31, 32, 33, 34]
];

const base = [42, 43, 44, 45, 46, 47, 48]; // Full width single line
const arrow = [
  // Solid stem (cols 2, 3, 4)
  2, 3, 4, 
  9, 10, 11, 
  16, 17, 18, 
  // Solid triangle head
  22, 23, 24, 25, 26, 
  30, 31, 32, 
  38
];

const shiftArrow = (offsetRows: number) => {
  return arrow.map(i => i + offsetRows * 7).filter(i => i >= 0 && i < 42); // Hide anything that hits the base (row 6) or goes off-grid
};

export const downloadFrames = [
  // Normal
  [...base, ...shiftArrow(0)],
  // Down 1
  [...base, ...shiftArrow(1)],
  // Down 2
  [...base, ...shiftArrow(2)],
  // Down 3
  [...base, ...shiftArrow(3)],
  // Down 4
  [...base, ...shiftArrow(4)],
  // Gone
  [...base],
  // From top 1
  [...base, ...shiftArrow(-4)],
  // From top 2
  [...base, ...shiftArrow(-3)],
  // From top 3
  [...base, ...shiftArrow(-2)],
  // From top 4
  [...base, ...shiftArrow(-1)],
  // Normal
  [...base, ...shiftArrow(0)]
];
