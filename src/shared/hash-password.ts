import bcrypt from 'bcrypt'

const saltOrRounds = 8

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, saltOrRounds)
}

export const comparePassword = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}
