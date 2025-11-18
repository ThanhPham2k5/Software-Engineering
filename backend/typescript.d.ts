declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET: string;
    // Thêm các biến ENV khác của bạn ở đây
    // VÍ DỤ: DATABASE_URL: string;
  }
}
