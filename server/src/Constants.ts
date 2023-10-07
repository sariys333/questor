import * as jose from 'jose'

export const SECRET_KEY = jose.generateSecret('HS256')