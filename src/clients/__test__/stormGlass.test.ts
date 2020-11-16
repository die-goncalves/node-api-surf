import { StormGlass } from '@src/clients/StormGlass'

describe('StormGlass client', () => {
  it('Should return the normalized forecast from the StormGlass service', async () => {
    const lat = 19.385;
    const lng = -139.4;

    const stormGlass = new StormGlass();
    const response = await stormGlass.fetchPoints(lat, lng);
    expect(response).toEqual({})
  })
});