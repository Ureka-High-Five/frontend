export function classifyUser(watchTime: number): "swiper" | "settler" {
  return watchTime < 5 ? "swiper" : "settler";
}
