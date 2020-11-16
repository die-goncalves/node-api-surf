import { StormGlass } from '@src/clients/StormGlass';
import axios from 'axios';

jest.mock('axios');

describe('StormGlass client', () => {
  it('Should return the normalized forecast from the StormGlass service', async () => {
    const lat = 19.385;
    const lng = -139.4;

    axios.get = jest.fn().mockResolvedValue({  });

    const stormGlass = new StormGlass(axios);
    const response = await stormGlass.fetchPoints(lat, lng);
    expect(response).toEqual({})
  })
});