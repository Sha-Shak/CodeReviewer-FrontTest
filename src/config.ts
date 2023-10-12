console.log("ENV", import.meta.env)
const conf = {
  API_BASE_URL: import.meta.env.VITE_SERVER_URL
}

export default conf;