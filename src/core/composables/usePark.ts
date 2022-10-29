import { CartInterface, ParkItemInterface } from 'src/core/types/model.d';
import { useParkStore } from './../../stores/terminal/park-store';
import { useCart } from 'src/core/composables/useCart';
import { v4 as uuidv4 } from 'uuid';

export function usePark(store = useParkStore()){

  const CartManager = useCart();

  function addPark( cart: CartInterface ) {
    const id = uuidv4();
    const park: ParkItemInterface = {  id, cart };
    store.parks.unshift(park);
  }

  function parkCurrentCart() {
    addPark(CartManager.getCurrentCart());
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
    parkCurrentCart,
  }

}
