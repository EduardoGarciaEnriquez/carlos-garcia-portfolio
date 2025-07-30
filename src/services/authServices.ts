export const loginUser = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  return await fetch(`http://localhost:8080/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to login')
    })
    .catch((error) => {
      throw error
    })
}

export const sendRecoveryEmail = async (email: string) => {
  return await fetch(`http://localhost:8080/api/v1/auth/recover-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Unauthorized')
    })
    .catch((error) => {
      throw error
    })
}

export const updatePassword = async ({
  token,
  password,
}: {
  token: string
  password: string
}) => {
  return await fetch(`http://localhost:8080/api/v1/auth/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, password }),
  })
    .then((response) => {
      if (response.ok === true) return response.json()
      throw new Error('Failed to change password')
    })
    .catch((error) => {
      throw error
    })
}
