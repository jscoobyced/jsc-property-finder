import { getNextPageProperties } from './fetchProperty';
import { PropertyData } from './parseProperty';

const main = async () => {
  const properties: PropertyData[] = [];
  await getNextPageProperties(1, properties);
  console.log('Total Properties:', properties.length);
  const myWishedProperties = properties
    .filter(
      (property) =>
        property.bedrooms >= 2 &&
        property.pricePerSqm < 70000 &&
        property.bathrooms >= 2 &&
        property.livingArea >= 75 &&
        property.floor >= 7,
    )
    .sort((a, b) => a.priceTag - b.priceTag);
  console.log(myWishedProperties);
};

main();
