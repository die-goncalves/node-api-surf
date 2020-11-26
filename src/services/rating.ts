import { Beach, BeachPosition } from '@src/models/beach';

export class Rating {
  constructor(private beach: Beach) { }

  public getRatingBasedOnWindAndWavePositions(waveDirection: BeachPosition, windDirection: BeachPosition): number {
    // if wind is onshore, low rating
    if (waveDirection === windDirection) {
      return 1;
    }
    return 0;
  }
}
