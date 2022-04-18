// Serialize fields to string like `createdAt: Date`
export const serializeResponse = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};
