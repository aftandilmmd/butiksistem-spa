import { ParkItemInterface } from 'src/core/types/model';
import { CartStateInterface } from 'src/core/types/cart-types';
import { useParkStore } from 'src/stores/terminal/park-store';
import { useCart } from 'src/core/composables/useCart';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import CartItem from '../models/CartItem';
import { sum } from 'lodash';

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

  function restorePark(park : ParkItemInterface): void{

    CartManager.setCurrentCart(park.cart)

  }

  function restoreParkById(id = null): void{

    const park = id ? getPark(id) : getRecentPark();

    CartManager.setCurrentCart(park.cart)

  }

  function removeParkById(id: string): void{

    if(! id ) return;

    store.parks = store.parks.filter((park: ParkItemInterface) => park.id !== id);

  }

  function getPark(id: string): ParkItemInterface{
    return store.parks.find((park: ParkItemInterface) => park.id === id);
  }

  function getParks(): ParkItemInterface[] {
    return store.parks;
  }

  function hasParks(): boolean {
    return store.parks.length > 0;
  }

  function getRecentPark(): ParkItemInterface {
    return store.parks[0];
  }

  function getOldestPark(): ParkItemInterface {
    return store.parks.slice(-1);
  }

  function getParkTotalPrice(park: ParkItemInterface){
    return sum(park.cart.items.map(item => CartItem(item).getUpdatedTotalPrice()));
  }

  return {
    addPark,
    removePark,
    restorePark,
    restoreParkById,
    removeParkById,
    getPark,
    getParks,
    hasParks,
    getRecentPark,
    getOldestPark,
    getParkTotalPrice
  }

}

