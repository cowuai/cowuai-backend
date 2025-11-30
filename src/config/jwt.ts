import dotenv from 'dotenv-safe';

dotenv.config({
  example: '.env.example',
  allowEmptyValues: false,
});

const jwtSecret = process.env.JWT_SECRET;

export const jwtConfig = {
  secret: jwtSecret as string,
    expiresIn: 3600, // 1 hora em segundos
};