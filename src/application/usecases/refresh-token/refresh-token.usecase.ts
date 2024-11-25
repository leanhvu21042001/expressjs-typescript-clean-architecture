import moment from 'moment'

import { UserGateway } from '~/domain/repositories/user.repository'
import { UnauthorizedException } from '~/infrastructure/exceptions/exceptions'
import { decodeToken, generateToken, verifyToken } from '~/shared/jwt-auth.shared'

import { IUseCase } from '../usecase.interface'

export type RefreshTokenInputDto = {
  accessToken: string
  refreshToken: string
}

export type RefreshTokenOutputDto = {
  accessToken: string
  refreshToken: string
}

export class RefreshTokenUseCase implements IUseCase<RefreshTokenInputDto, RefreshTokenOutputDto> {
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway): RefreshTokenUseCase {
    return new RefreshTokenUseCase(userGateway)
  }

  async execute(input: RefreshTokenInputDto): Promise<RefreshTokenOutputDto> {
    if (!input.accessToken) {
      throw new UnauthorizedException('Access token is missing')
    }

    if (!input.refreshToken) {
      throw new UnauthorizedException('Refresh token is missing')
    }

    // just need to verify refresh token, because accessToken is already verified before and it has expired
    const accessTokenVerified = decodeToken(input.accessToken)
    const refreshTokenVerified = verifyToken(input.refreshToken, 'refresh')

    // Compare should be equal of tokens
    const userByAccessToken = await this.userGateway.findById(accessTokenVerified.id)
    const userByRefreshToken = await this.userGateway.findById(refreshTokenVerified.id)
    if (!userByAccessToken?.id || !userByAccessToken.id || userByAccessToken?.id !== userByRefreshToken?.id) {
      throw new UnauthorizedException('Invalid access or refresh token')
    }

    // Calculate refresh token expiration time
    const expirationDate = moment(((refreshTokenVerified.exp ?? 0) + 1) * 1000)
    const currentTime = moment.now()
    const refreshExpMilliseconds = expirationDate.diff(currentTime, 'milliseconds')

    const payload = {
      id: userByAccessToken.id || '',
    }
    // generate new access and refresh tokens
    const accessToken = generateToken(payload, 'access')
    const refreshToken = generateToken(payload, 'refresh', { expiresIn: `${refreshExpMilliseconds}ms` })

    return {
      accessToken,
      refreshToken,
    }
  }
}
