const success = (status: number, message: string, data?: any) => {
  return {
    status,
    success: true,
    message,
    data,
  };
};

const fail = (status: number, message: string) => {
  return {
    status,
    success: false,
    message,
  };
};

export { success, fail };
