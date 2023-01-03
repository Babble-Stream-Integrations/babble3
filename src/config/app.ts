const prod = {
  backendUrl: "https://backend-sdjmg6ndkq-ew.a.run.app",
  base: "https://europe-west1-babble-d6ef3.cloudfunctions.net/default",
};
const dev = {
  // backendUrl: "https://backend-sdjmg6ndkq-ew.a.run.app",
  // base: "https://europe-west1-babble-d6ef3.cloudfunctions.net/default",
  backendUrl: "http://localhost:3001",
  base: "http://localhost:5001/babble-d6ef3/europe-west1/default",
};

export const appConfig = process.env.NODE_ENV === "development" ? dev : prod;
