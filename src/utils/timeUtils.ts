/**
 * Konvertiert Echtzeit (Millisekunden) in In-Game-Zeit (Sekunden).
 * @param realTimeMs Echtzeit in Millisekunden
 * @param timeScale Multiplikator für die Zeit (Standard: 1 Tag = 1 Sekunde)
 * @returns In-Game-Zeit in Sekunden
 */
export function realTimeToGameTime(realTimeMs: number, timeScale: number = 1): number {
  const secondsInRealDay = 24 * 60 * 60 * 1000; // 1 Tag in Millisekunden
  return (realTimeMs / secondsInRealDay) * timeScale;
}

/**
 * Konvertiert In-Game-Zeit (Sekunden) in Echtzeit (Millisekunden).
 * @param gameTimeSeconds In-Game-Zeit in Sekunden
 * @param timeScale Multiplikator für die Zeit (Standard: 1 Tag = 1 Sekunde)
 * @returns Echtzeit in Millisekunden
 */
export function gameTimeToRealTime(gameTimeSeconds: number, timeScale: number = 1): number {
  const secondsInRealDay = 24 * 60 * 60 * 1000; // 1 Tag in Millisekunden
  return (gameTimeSeconds / timeScale) * secondsInRealDay;
}
