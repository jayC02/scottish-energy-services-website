// Optional quotation details shared by the form, client validation and endpoint.
export const quoteFields = [
  { name: 'propertyAddress', label: 'Property address or postcode', limit: 300, options: [] },
  { name: 'propertyType', label: 'Property type', limit: 120, options: [], placeholder: 'e.g. office, shop, flat or mixed-use building' },
  { name: 'floorArea', label: 'Approximate floor area (m²)', limit: 40, options: [], placeholder: 'e.g. 250' },
  { name: 'buildingStatus', label: 'New build or existing building?', limit: 30, options: ['New build', 'Existing building', 'Conversion or extension', 'Not sure'] },
  { name: 'drawings', label: 'Are plans or drawings available?', limit: 30, options: ['Available', 'Not yet available', 'Not sure'] },
  { name: 'completionDate', label: 'Required completion date or timeframe', limit: 100, options: [], placeholder: 'e.g. 20 November or within four weeks' }
];

export function validateQuoteDetails(values) {
  const errors = {};
  for (const field of quoteFields) {
    const value = String(values[field.name] || '').trim();
    if (value.length > field.limit) errors[field.name] = `Please use no more than ${field.limit} characters.`;
    else if (/[\x00-\x1f\x7f]/.test(value)) errors[field.name] = 'Please enter a value without line breaks or control characters.';
    else if (field.options.length && value && !field.options.includes(value)) errors[field.name] = 'Please select an option from the list.';
  }
  const area = String(values.floorArea || '').trim();
  if (area && (!/^\d+(?:\.\d+)?$/.test(area) || Number(area) <= 0 || Number(area) > 100000000)) {
    errors.floorArea = 'Enter an approximate area in square metres, or leave this blank.';
  }
  return errors;
}
