const transformToSnakeCaseToCamelCase = (value: string): string => {
  return value
    .split('_')
    .map((item, index) =>
      index === 0 ? item : `${item[0].toUpperCase()}${item.slice(1)}`,
    )
    .join('');
};

export default transformToSnakeCaseToCamelCase;
