// session
export const sessionSecret = process.env.SESSION_SECRET;

// cors
export const corsOrigin = process.env.CORS_ORIGIN;

// jwt
export const privateKey = JSON.parse(`"${process.env.JWT_PRIVATE_KEY}"`);
export const publicKey = JSON.parse(`"${process.env.JWT_PUBLIC_KEY}"`);
