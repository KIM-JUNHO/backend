import dotenv from 'dotenv';

dotenv.config();

const defaultPort = 4000;

export const environment = {
  port: process.env.PORT || defaultPort,
};
