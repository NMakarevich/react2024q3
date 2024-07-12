export function transformStars(stars: number | undefined): string {
  return stars
    ? stars >= 1000
      ? `${Math.round(stars / 1000)}k`
      : `${stars}`
    : '0';
}
