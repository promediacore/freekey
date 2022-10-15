export async function handle({ event, resolve, platform }) {
  console.log(platform)
  const response = await resolve(event)
  return response
}
