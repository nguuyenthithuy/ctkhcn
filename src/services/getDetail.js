import { del, get, patch, post } from "../utils/request";

export const getDetail = async (query) => {
  const result = await get(`construction?${query}`);
  return result;
};
export const createCongTrinh = async (options) => {
  const result = await post("construction", options);
  return result;
};
export const callUpdate = async (id, title, summary, keyword, note) => {
  const result = await patch(`construction/${id}`, {
    id,
    title,
    summary,
    keyword,
    note,
  });
  return result;
};
export const delCongTrinh = async (id) => {
  const result = await del(`construction/${id}`);
  return result;
};
