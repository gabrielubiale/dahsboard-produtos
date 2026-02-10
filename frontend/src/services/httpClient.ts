const BASE_URL = 'http://localhost:3001'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${path}`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    const message = `HTTP error ${response.status}`
    throw new Error(message)
  }

  if (response.status === 204) {
    // No Content
    return undefined as T
  }

  return (await response.json()) as T
}

export const httpClient = {
  get<T>(path: string) {
    return request<T>(path, { method: 'GET' satisfies HttpMethod })
  },
  post<T>(path: string, body: unknown) {
    return request<T>(path, {
      method: 'POST' satisfies HttpMethod,
      body: JSON.stringify(body),
    })
  },
  put<T>(path: string, body: unknown) {
    return request<T>(path, {
      method: 'PUT' satisfies HttpMethod,
      body: JSON.stringify(body),
    })
  },
  delete<T>(path: string) {
    return request<T>(path, { method: 'DELETE' satisfies HttpMethod })
  },
}

