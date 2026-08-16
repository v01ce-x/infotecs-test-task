export const getNestedValue = (object: any, path: string) => {
  if (!object || !path) return '';

  const keys = path.split('.');

  const value = keys.reduce((current, key) => {
    return current[key] !== undefined ? current[key] : undefined;
  }, object);

  return value ? value : '';
};
