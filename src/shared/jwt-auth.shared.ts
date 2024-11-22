/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken'

import { UnauthorizedException } from '~/domain/exceptions/exceptions'

import { ENV } from './env.shared'

type IPayloadSignToken = {
  id: string
  exp?: number
  iat?: number
}
type IDecodeToken = (Jwt | JwtPayload | string) & IPayloadSignToken

const getExpireTime = (secretType: 'access' | 'refresh'): number | string => {
  return secretType === 'access' ? ENV.ACCESS_TOKEN_EXPIRES_IN : ENV.REFRESH_TOKEN_EXPIRES_IN
}

const getSecret = (secretType: 'access' | 'refresh'): string => {
  return secretType === 'access' ? ENV.ACCESS_TOKEN_SECRET : ENV.REFRESH_TOKEN_SECRET
}

export const generateToken = (
  payload: IPayloadSignToken,
  secretType: 'access' | 'refresh',
  options?: { expiresIn?: number | string },
): string => {
  const secret = getSecret(secretType)
  const expiresIn = options?.expiresIn ?? getExpireTime(secretType)
  return jwt.sign(payload, secret, { expiresIn })
}

export const verifyToken = (token: string, secretType: 'access' | 'refresh'): IDecodeToken => {
  const secret = getSecret(secretType)
  try {
    const decoded = jwt.verify(token, secret) as IDecodeToken
    return decoded
  } catch (error) {
    throw new UnauthorizedException('Token is invalid or expired')
  }
}

export const decodeToken = (token: string): IDecodeToken => {
  const decoded = jwt.decode(token) as IDecodeToken
  return decoded
}

// TODO: just for test purpose
// export const refreshAccessToken = (refreshToken: string, user: IPayloadSignToken): string => {
//   try {
//     if (!refreshToken) {
//       throw new UnauthorizedException('Refresh token is missing')
//     }

//     const decoded = jwt.verify(refreshToken, ENV.REFRESH_TOKEN_SECRET) as IDecodeToken

//     if (user.id !== decoded.id) {
//       throw new UnauthorizedException('Invalid refresh token')
//     }

//     const payload = {
//       id: user.id,
//       name: user.name,
//       avatar: user.avatar,
//       createdAt: user.createdAt
//     }
//     const accessToken = generateToken(payload, 'access')
//     return accessToken
//   } catch (error) {
//     throw new UnauthorizedException('Can not refresh access token')
//   }
// }

// TODO: just for test purpose
export const expiredToken = (token: string, secretType: 'access' | 'refresh'): boolean => {
  const secret = getSecret(secretType)
  try {
    jwt.verify(token, secret)
    return false
  } catch (error) {
    if (isError(error) && error.name === 'TokenExpiredError') {
      return true
    }
    throw error
  }
}
// TODO: just for test purpose
function isError(error: unknown): error is Error {
  return (error as Error).name !== undefined
}
