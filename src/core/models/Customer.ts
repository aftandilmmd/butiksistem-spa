import { CustomerInterface } from '../types/cart-types';

function Customer(model: CustomerInterface){

  function getFirstname(): string | null {
    return model.first_name;
  }

  function getLastname(): string | null {
    return model.last_name;
  }

  function getPhone(): string | null {
    return model.phone;
  }

  function getEmail(): string | null {
    return model.email;
  }

  function getMeta(): object | undefined {
    return model.meta;
  }

  function getFullName(): string {
    const first_name = getFirstname();
    const last_name = getLastname();

    if (!first_name || !last_name) {
      return '';
    }

    return first_name + ' ' + last_name

  }

  // Return Methods
  return {
    getFirstname,
    getLastname,
    getFullName,
    getEmail,
    getPhone,
    getMeta,
  }

}

export default Customer;
