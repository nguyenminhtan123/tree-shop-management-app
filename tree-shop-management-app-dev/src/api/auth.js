import { get, post, put, del } from './utils';

export async function adminLoginApi(data) {
  return post('/users/login', data);
}

export async function signUpApi(data) {
  return post('/users/register', data);
}
//
export async function forgotPasswordApi(data) {
  return post('/users/forgotPassword', data);
}

export async function confirmCodeApi(data) {
  return post(`/users/${data.userId}/confirmCode`, data.codeConfirm);
}

export async function resetPasswordApi(data) {
  return post(`/users/${data.userId}/resetPassword`, data.password);
}
//
export async function fetchProductApi() {
  return get('/products');
}
export async function fetchProductTypesApi() {
  return get('/productTypes');
}

export async function fetchUserApi(id) {
  return get(`/users/${id}`);
}

export async function fetchOrderHistoryApi(id) {
  return get(`/users/${id}/orderHistory`);
}

export async function cancelOrderApi(id) {
  return put(`/orders/${id}/cancel`);
}

export async function addToCartByIdApi(data) {
  return post(`/users/${data.userId}/cart`, data.requestData);
}

export async function fetchProductsInCartApi(data) {
  return get(`/users/${data}/cart`);
}

export async function minusQuantityApi(data) {
  return put(`/${data.userId}/minusquantity`, data.requestData);
}

export async function plusQuantityApi(data) {
  return put(`/${data.userId}/plusquantity`, data.requestData);
}

export async function orderApi(data) {
  return post(`/users/${data}/orderProduct`);
}

export async function deleteProductApi(data) {
  return del(`/${data.userId}/cart/${data.prodId}`);
}

export async function deleteAllProductApi(data) {
  return del(`/${data}/cart`);
}

export async function changePasswordByIdApi(data) {
  return put(`/users/${data.userId}/password`, data.requestData);
}

export async function UpdateUserProfileByIdApi(data) {
  return put(`/users/${data.userId}/profile`, data.requestData);
}

export async function sentDeviceTokenByIdApi(data) {
  return put(`/${data.userId}/${data.deviceToken}`);
}
