export const photos = {
  interior1: "/photos/ai_interior.png",   // tables w/ fairy lights
  crowd: "/photos/ai_crowd.png",       // packed group hangout (best wide shot)
  yellowStripe: "/photos/ai_yellow_stripe.png",// yellow striped pillar + wall art
  drinkPink: "/photos/ai_drink_pink.png",   // pink cooler drink
  balloons: "/photos/ai_balloons.png",    // balloon wall (birthday party)
  mojito: "/photos/ai_mojito.png",      // green mojito held up
  stickyWall: "/photos/ai_sticky_wall.png",  // sticky-note wishes wall (the icon shot)
  ambience1: "/photos/ai_interior.png",   // wide ambience with lights
  artWall: "/photos/ai_art_wall.png",     // framed art + hanging plant
  ambience2: "/photos/ai_interior.png",  // diners + lights
};

export const allPhotos = Object.entries(photos).map(([key, url]) => ({ key, url }));