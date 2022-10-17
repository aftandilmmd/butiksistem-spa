import { v4 as uuidv4 } from "uuid";
import * as dayjs from "dayjs";

export function ParkResource(park = {}) {
  return {
    hash_id: park.hash_id || uuidv4(),
    title: park.title || "",
    parked_at: park.parked_at || dayjs().format(),
    cart: park.cart,
  };
}
