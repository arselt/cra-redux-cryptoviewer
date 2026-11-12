const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Runs `task`, retrying after each delay while `isRetryable(error)`; rethrows the last error
export const withRetry = async (task, { delays = [1500, 4000], isRetryable = () => true } = {}) => {
  for (let attempt = 0; ; attempt++) {
    try {
      return await task();
    } catch (error) {
      if (attempt >= delays.length || !isRetryable(error)) throw error;
      await wait(delays[attempt]);
    }
  }
};
