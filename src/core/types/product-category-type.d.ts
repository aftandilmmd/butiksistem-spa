export type ProductCategoryType = {
  type: 'product_categories',
  id: number,
  attributes: {
    name: string,
    parent_id: number,
    status: boolean,
    sort_num: number,
    url: string,
    visibility: boolean,
    description: string | null,
    image: string | null,
    meta_description: string | null,
    meta_keyword: string | null,
    seo_title: string | null,
  }
}
