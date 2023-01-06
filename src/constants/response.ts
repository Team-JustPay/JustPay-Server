export const success = (status: number, message: string, data?: any) => {
  return {
    status,
    message,
    data,
  };
};

export const fail = (status: number, message: string) => {
  return {
    status,
    message,
  };
};
