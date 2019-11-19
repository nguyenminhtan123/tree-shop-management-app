import { isUndefined } from 'lodash';
import { get } from './utils';

export async function getMemberListApi(page) {
  const NUMBER_OF_MEMBER_PER_PAGE = 10;
  let offset = page * NUMBER_OF_MEMBER_PER_PAGE;
  offset = Math.max(offset, 0);
  let baseUrl = `/products?limit=${NUMBER_OF_MEMBER_PER_PAGE}&orderBy=-createdAt`;
  if (!isUndefined(offset) && offset >= 0) {
    baseUrl += `&offset=${offset}`;
  }

  return get(baseUrl);
}
