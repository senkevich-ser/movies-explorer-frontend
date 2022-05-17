const visibleCardsNumbers = {
  1440: { total: 12, add: 4 },
  1280: { total: 12, add: 3 },
  768: { total: 8, add: 2 },
  480: { total: 5, add: 2 },
};

export const getVisualProps = (width) => {
  let point = 0;
  if (width > 1280) {
    point = 1440;
  } else if (width > 1006) {
    point = 1280;
  } else if (width > 646) {
    point = 768;
  } else {
    point = 480;
  };
  return visibleCardsNumbers[point];
};


