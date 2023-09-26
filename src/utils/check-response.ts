const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err));
};

export default checkResponse;
