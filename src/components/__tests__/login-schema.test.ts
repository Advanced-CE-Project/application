import { loginSchema } from '@/features/schema/login-schema'

describe('loginSchema', () => {
  it('should pass with valid data', () => {
    expect(() =>
      loginSchema.parse({ email: 'a@b.com', password: '123456' })
    ).not.toThrow()
  })

  it('should fail with invalid email', () => {
    expect(() =>
      loginSchema.parse({ email: 'a', password: '123456' })
    ).toThrow()
  })
})