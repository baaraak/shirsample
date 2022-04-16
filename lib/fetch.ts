export default function $fetch(url: string, method = 'GET', body?: any) {
  return fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}
