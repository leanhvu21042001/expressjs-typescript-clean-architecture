interface IEnv {
  NODE_ENV: 'production' | 'development' | 'test' | string | undefined
  PORT: string | undefined

  // database
  POSTGRES_URI: string | undefined

  // upload files
  CLOUDINARY_API_KEY: string | undefined
  CLOUDINARY_API_SECRET: string | undefined
  CLOUDINARY_CLOUD_NAME: string | undefined

  // jwt
  ACCESS_TOKEN_EXPIRES_IN: string
  REFRESH_TOKEN_EXPIRES_IN: string
  ACCESS_TOKEN_SECRET: string
  REFRESH_TOKEN_SECRET: string
}

export const ENV: IEnv = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  // database
  POSTGRES_URI: process.env.POSTGRES_URI,

  // upload files
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,

  // jwt

  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || '',
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || '',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '',
}
