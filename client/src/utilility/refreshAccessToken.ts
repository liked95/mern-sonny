export async function refreshAccessToken() {
  try {
    const response = await fetch('/api/auth/refresh-token', {
      method: 'POST',
    }).then(res => res.json())

    return response.data
  } catch (error) {
    console.error('Error refresh access token', error)
    return null
  }
}
