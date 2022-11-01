import { useProductStore } from 'src/stores/terminal/product-store';
import { CategoryInterface, ProductInterface } from '../types/model';
import Product from '../models/Product';
import { uniqBy } from 'lodash';

export function useProduct(store = useProductStore()){

  function item(item: ProductInterface) {
    return Product(item);
  }

  function getProducts(){
    return store.products;
  }

  function getFavoriteProducts(){
    return getProducts().filter((product: ProductInterface) => store.favorite_ids.includes(product.id));
  }

  function getFavoritesCount(){
    return store.favorite_ids.length;
  }

  function getProductsCount(){
    return store.products.length;
  }

  function favorite(product: ProductInterface){
    store.favorite_ids = [product.id, ...store.favorite_ids];
  }

  function unfavorite(product: ProductInterface): void {
    store.favorite_ids = store.favorite_ids.filter((id: number) => id != Product(product).getId());
  }

  function isFavorited(product: ProductInterface){
    return store.favorite_ids.findIndex((id: number) => id == Product(product).getId()) != -1
  }

  function getUniqueCategories(){

    const categories: CategoryInterface[] = [];

    getProducts().forEach((product: ProductInterface) => {

      const categories = Product(product).getCategories();

      (categories.length > 0) && categories.push(...categories)

    });

    return uniqBy(categories, 'id');

  }

  function getProductsByCategoryId(category_id: number){

    if( category_id < 1) return [];

    return getProductsWithCategories().filter(pc => pc.categories.includes(category_id)).map(pc => pc.product);

  }

  function getProductsWithCategories(){

    return getProducts().map(product => ({
      categories: Product(product).getCategories().map((category: CategoryInterface) => category.id),
      product
    }))

  }

  return {
    item,
    favorite,
    unfavorite,
    isFavorited,
    getProducts,
    getProductsCount,
    getFavoritesCount,
    getUniqueCategories,
    getFavoriteProducts,
    getProductsByCategoryId,
  }

}
