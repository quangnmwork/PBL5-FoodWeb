export const categories = [
  {
    idCategory: 1,
    nameCategory: 'Đồ ăn'
  },
  {
    idCategory: 2,
    nameCategory: 'Đồ uống'
  },
  {
    idCategory: 3,
    nameCategory: 'Đồ chay'
  },
  {
    idCategory: 4,
    nameCategory: 'Bánh kem'
  },
  {
    idCategory: 5,
    nameCategory: 'Tráng miệng'
  }
];
export const returnIdCategory = (nameCategory: string) => {
  categories.forEach((category) => {
    if (category.nameCategory == nameCategory) return category.idCategory;
  });
  return 1;
};
