import { CartStateInterface, ParkItemInterface } from 'src/core/types/model.d';
import { useParkStore } from 'src/stores/terminal/park-store';
import { useCart } from 'src/core/composables/useCart';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

const CartManager = useCart();

export function usePark(store = useParkStore()){

  function addPark(title = '',  cart: CartStateInterface ) {
    if(title.length === 0){
      title = dayjs().format('DD-MM-YYYY HH:mm') + ' tarihli park'
    }
    const id = uuidv4();
    const park: ParkItemInterface = { title, id, cart, created_at: dayjs().unix().toString() };
    store.parks.unshift(park);

    return park;
  }

  function removePark(id: string): void{
    store.parks = store.parks.filter((park: ParkItemInterface) => park.id !== id);
  }

  function restorePark(id = null): void{

    const park = id ? getPark(id) : getRecentPark();

    CartManager.setCurrentCart(park.cart)

  }

  function getPark(id: string): ParkItemInterface{
    return store.parks.find((park: ParkItemInterface) => park.id === id);
  }

  function getParks(): ParkItemInterface[] {
    return store.parks;
  }

  function getRecentPark(): ParkItemInterface {
    return store.parks[0];
  }

  function getOldestPark(): ParkItemInterface {
    return store.parks.slice(-1);
  }

  return {
    addPark,
    removePark,
    restorePark,
    getPark,
    getParks,
    getRecentPark,
    getOldestPark,
  }

}
