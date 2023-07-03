const rateLimit = require("express-rate-limit");

const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min in milliseconds
  max: 5,
  message:
    "you have reached maximum retries. Please try again after 30 minutes",
  statusCode: 429,
  skipSucessfullRequest: true,
  headers: true,
});

const rentalPost = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min in milliseconds
  max: 2,
  message:
    "you have reached maximum retries. Please try again after 30 minutes",
  statusCode: 429,
  headers: true,
});

module.exports = { loginRateLimiter, rentalPost };
