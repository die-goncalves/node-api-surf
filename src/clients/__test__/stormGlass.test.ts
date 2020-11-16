import { StormGlass } from '@src/clients/StormGlass';
import axios from 'axios';
import StormGlassWeather3HoursFixture from '@__test__/fixtures/stormglass_weather_3_hours.json';
import StormGlassNormalized3HoursFixture from '@__test__/fixtures/stormglass_normalized_response_3_hours.json';

jest.mock('axios');

describe('StormGlass client', () => {
  it('Should return the normalized forecast from the StormGlass service', async () => {
    const lat = 19.385;
    const lng = -139.4;

    axios.get = jest.fn().mockResolvedValue(StormGlassWeather3HoursFixture);

    const stormGlass = new StormGlass(axios);
    const response = await stormGlass.fetchPoints(lat, lng);
    expect(response).toEqual(StormGlassNormalized3HoursFixture)
  })
});