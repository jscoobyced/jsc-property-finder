const SEARCH_URL =
  'https://www.fazwaz.com/property-for-sale/thailand/bangkok?mapEnable=0&type=condo,apartment,penthouse&order_by=rank|asc&price=PRICEMIN,PRICEMAX&living_area=AREAMIN,null&price_per_sqm=PRICESQMMIN,PRICESQMMAX&page=PAGE';

const PER_PAGE = 30;

export interface SearchResult {
  success: boolean;
  content: string;
}

export interface SearchParams {
  priceMin: number;
  priceMax: number;
  areaMin: number;
  pricesqmMin: number;
  pricesqmMax: number;
  page: number;
}

export const buildSearchUrl = (searchParams: SearchParams) => {
  const url = SEARCH_URL.replace('PRICEMIN', searchParams.priceMin.toString())
    .replace('PRICEMAX', searchParams.priceMax.toString())
    .replace('AREAMIN', searchParams.areaMin.toString())
    .replace('PRICESQMMIN', searchParams.pricesqmMin.toString())
    .replace('PRICESQMMAX', searchParams.pricesqmMax.toString())
    .replace('PAGE', searchParams.page.toString());
  return url;
};

export const getNextPageNumber = (
  currentPage: number,
  totalPages: number,
): number => {
  if (currentPage < Math.ceil(totalPages / PER_PAGE)) {
    return currentPage + 1;
  }
  return -1;
};

export const getSearchResult = async (
  searchUrl: string,
): Promise<SearchResult> => {
  const result: SearchResult = { success: false, content: '' };

  const response = await fetch(searchUrl, {
    method: 'GET',
    referrer: 'https://www.fazwaz.com',
  });
  try {
    const data = await response.text();
    result.content = data;
    result.success = true;
  } catch (error) {
    result.content = (error as Error).message;
  }
  return result;
};
