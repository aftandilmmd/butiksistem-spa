export default {

  get getId(){
    return this?.id;
  },

  get getName(){
    return this?.attributes?.name;
  },

  get getPrice(){
    return this?.attributes?.price;
  },

}
