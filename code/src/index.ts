import { parsePropertyData } from './parseProperty';
import { getSearchResult } from './search';

const main = async () => {
  const searchResult = await getSearchResult();
  const parseResult = parsePropertyData(searchResult.content);
  console.log(parseResult.length);
};

main();
