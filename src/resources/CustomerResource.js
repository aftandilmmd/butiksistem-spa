import { v4 as uuidv4 } from 'uuid';

export function CustomerResource(customer = {}) {
  return {
    hash_id: uuidv4(),
    type: customer.type, // personal - company

    // Common Data
    name: customer.name,
    phone: customer.phone,
    email: customer.email,
    city: customer.city,
    district: customer.district,
    address: customer.address,
    note: customer.note,

    // Personal Data
    id: customer.id,
    card_id: customer.card_id, // TC No
    sex: customer.sex,
    birth_date: customer.birth_date,

    //Company Data
    title: customer.title, // Ünvan
    tax_number: customer.tax_number, // Vergi Numarası
    tax_office: customer.tax_office, // Vergi Dairesi
  };
}
