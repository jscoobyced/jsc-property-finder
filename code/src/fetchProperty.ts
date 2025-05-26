import {
  parsePageInfo,
  parsePropertyData,
  PropertyData,
} from './parseProperty';
import { buildSearchUrl, getNextPageNumber, getSearchResult } from './search';
import { delay } from './utils';

export const getNextPageProperties = async (
  page = 1,
  properties: PropertyData[] = [],
) => {
  console.log(`Fetching page ${page}`);
  const searchUrl = buildSearchUrl({
    priceMin: 1000000,
    priceMax: 5000000,
    areaMin: 50,
    pricesqmMin: 60000,
    pricesqmMax: 95000,
    page,
  });
  const searchResult = await getSearchResult(searchUrl);
  const newProperties = parsePropertyData(searchResult.content);
  properties.push(...newProperties);
  const totalPages = parsePageInfo(searchResult.content);
  const nextPage = getNextPageNumber(page, totalPages);
  if (nextPage !== -1) {
    await delay(2000);
    await getNextPageProperties(nextPage, properties);
  }
};
