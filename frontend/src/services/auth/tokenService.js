const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";
export const tokenService = {
  save(accessToken) {
    globalThis?.localStorage?.setItem(ACCESS_TOKEN_KEY, accessToken);
    globalThis?.sessionStorage?.setItem(ACCESS_TOKEN_KEY, accessToken);
  },
  get() {
    return globalThis?.localStorage?.getItem(ACCESS_TOKEN_KEY);
    // return globalThis?.sessionStorage?.getItem(ACCESS_TOKEN_KEY);
  },
  delete() {
    globalThis?.localStorage?.removeItem(ACCESS_TOKEN_KEY);
    globalThis?.sessionStorage?.removeItem(ACCESS_TOKEN_KEY);
  },
};
