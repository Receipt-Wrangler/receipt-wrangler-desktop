export const environment = {
  isProd: false,
  apiUrl: process.env["API_URL"] || "http://localhost:3000",
  version: process.env["VERSION"] || "unknown",
  build_date: process.env["BUILD_DATE"] || "unknown",
};
