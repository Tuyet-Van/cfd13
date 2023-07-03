export const formatCurrency = (data, type = "vi-VN") => {
  if (!data) return 0;
  return data.toLocaleString(type, { minimumFractionDigits: 0 });
};

export const formatDateDisplay = (data) => {
  if (!data) return null;
  const date = new Date(data);
  const day = ("0" + date.getUTCDate()).slice(-2);
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};
