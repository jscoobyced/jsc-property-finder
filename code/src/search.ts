import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'search.html');

const searchURl =
  'https://www.fazwaz.com/property-for-sale/thailand/bangkok?mapEnable=0&type=condo,apartment,penthouse&order_by=rank|asc&price=1000000,5000000&living_area=50,null&price_per_sqm=60000,95000';

export interface SearchResult {
  success: boolean;
  content: string;
}

export const getSearchFile = async (): Promise<SearchResult> => {
  const result: SearchResult = { success: false, content: '' };
  if (fs.existsSync(filePath)) {
    const file = await fs.promises.readFile(filePath, 'utf8');
    if (file) {
      result.success = true;
      result.content = file;
      return result;
    }
    console.log('File does not exist:', filePath);
  }
  return result;
};

export const getSearchResult = async (): Promise<SearchResult> => {
  const result: SearchResult = { success: false, content: '' };
  const response = await fetch(searchURl);
  try {
    const data = await response.text();
    result.content = data;
    result.success = true;
  } catch (error) {
    result.content = (error as Error).message;
  }
  return result;
};
