import React from 'react';

export default (initialValue: any) => {
  const [imgSrc, setImgSrc] = React.useState(initialValue.photoUrl);
  const [commission, setCommission] = React.useState<number>(initialValue.commission);
  const [isActive, setIsActive] = React.useState<boolean>(initialValue.active);
  const [img, setImg] = React.useState<File>(null);
  const [barcode, setBarcode] = React.useState(initialValue.barcodeList ? initialValue.barcodeList[0] : '');
  const [productName, setProductName] = React.useState(initialValue.name);
  const [isBarcodeSaved, setIsBarcodeSaved] = React.useState(false);
  const [isBarcodeCorrect, setIsBarcodeCorrect] = React.useState(false);
  const [parentCategory, setParentCategory] = React.useState({ value: '', label: '' });
  const [subCategory, setSubCategory] = React.useState({
    value: initialValue.categoryId,
    label: initialValue.categoryName,
  });
  const [tax, setTax] = React.useState({ value: initialValue.tax, label: `${initialValue.tax}%` });

  return {
    imgSrc,
    setImgSrc,
    commission,
    setCommission,
    isActive,
    setIsActive,
    img,
    setImg,
    barcode,
    setBarcode,
    productName,
    setProductName,
    isBarcodeSaved,
    setIsBarcodeSaved,
    isBarcodeCorrect,
    setIsBarcodeCorrect,
    parentCategory,
    setParentCategory,
    subCategory,
    setSubCategory,
    tax,
    setTax,
  };
};
