export async function getAddress(ip = "8.8.8.8") {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_Qz7BuZQV8a25lmxXYm9OkMJT5KIIm&ipAddress=${ip}`
  );
  return await response.json();
}
