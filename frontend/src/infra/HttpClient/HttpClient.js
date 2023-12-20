export const HttpClient = async (fetchUrl, fetchOptions) => {
  return fetch(fetchUrl, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
  }).then(async (serverResponse) => {
    return {
      body: await serverResponse.json(),
      ok: serverResponse.ok,
      status: serverResponse.status,
      statusText: serverResponse.statusText,
    };
  });
};
