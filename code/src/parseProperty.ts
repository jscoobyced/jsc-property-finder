import * as cheerio from 'cheerio';

export interface PropertyData {
  id: string;
  name: string;
  priceTag: number;
  pricePerSqm: number;
  bedrooms: number;
  bathrooms: number;
  livingArea: number;
  floor: number;
  camFee: number;
  url: string;
  mrt: number;
  bts: number;
}

export const parsePropertyData = (data: string) => {
  const $ = cheerio.load(data);

  const propertyData: PropertyData[] = [];

  $('div[data-tk="unit-result"]').each((index, element) => {
    void index;
    const dataId = $(element).attr('data-id') as string;

    const propertyName = $(element)
      .find('.unit-name--have-project-link')
      .text()
      .trim();

    const priceTag = parseInt(
      $(element)
        .find('.price-tag')
        .text()
        .replaceAll('\n', '')
        .trim()
        .split(' ')[0]
        .replace('฿', '')
        .replaceAll(',', ''),
      10,
    );

    const livingArea = parseFloat(
      $(element)
        .find('.wrap-icon-info')
        .find('[data-tooltip="Living Area"]')
        .text()
        .trim(),
    );

    const pricePerSqm = parseFloat((priceTag / livingArea).toFixed(2));

    const areaData = $(element)
      .find('.wrap-icon-info')
      .text()
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item !== '');

    const bedrooms = parseInt(areaData[0], 10);

    const bathrooms = parseInt(areaData[2], 10);

    const floor = parseInt(
      $(element)
        .find('.unit-info__basic-info.base-color')
        .last()
        .text()
        .trim()
        .replace(/Floor /g, ''),
      10,
    );

    const mrt = parseInt(
      $(element)
        .find(
          'unit-info__basic-info.unit-info__basic-info__nearplace.dynamic-tooltip.area-tooltip',
        )
        .last()
        .text()
        .trim()
        .replace(/MRT /g, '')
        .replace(/ km/g, ''),
      10,
    );

    const bts = parseFloat(
      $(element)
        .find(
          'unit-info__basic-info.unit-info__basic-info__nearplace.dynamic-tooltip.area-tooltip',
        )
        .last()
        .text()
        .trim()
        .replace(/BTS /g, '')
        .replace(/ km/g, ''),
    );

    const camFee = parseFloat(
      $(element)
        .find('.manage-tag__item')
        .eq(1)
        .text()
        .replace(/CAM Fee:/, '')
        .replace('฿', '')
        .replaceAll(',', '')
        .trim(),
    );

    const pageUrl =
      $(element).find('.unit-info__description-title').attr('href') ?? '';

    propertyData.push({
      id: dataId,
      name: propertyName,
      priceTag: priceTag,
      pricePerSqm: pricePerSqm,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      livingArea: livingArea,
      floor: floor,
      camFee: camFee,
      url: pageUrl,
      mrt: mrt,
      bts: bts,
    });
  });

  return propertyData;
};

export const parsePageInfo = (data: string) => {
  const $ = cheerio.load(data);

  return parseInt($('.result-search__h2').text().trim(), 10);
};
