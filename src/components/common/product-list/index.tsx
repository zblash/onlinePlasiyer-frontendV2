import * as React from 'react';
import _chunk from 'lodash.chunk';
import styled from '~/styled';
import { ProductCardWrapper } from '../product-card';
import { UITableColumns } from '~/components/ui/table';

/*
  ProductList Helpers
*/

export interface SpecifyProductData {
  id: string;
  sellerName: string;
  totalPrice: number;
}

interface ProductListProps {
  selectedCategoryId?: string;
}

const CHUNK_SIZE = 4;

const TABLE_SHOWN_DATA: UITableColumns<SpecifyProductData>[] = [
  {
    itemRenderer: 'sellerName',
    title: 'Satici',
  },
  {
    itemRenderer: 'totalPrice',
    title: 'Toplam fiyat',
  },
];

/*
  ProductList Colors
*/
export const ProductListColors = {
  wrapperBackground: '#fff',
};

/*
  ProductList Styles
*/

const StyledCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  ${ProductCardWrapper} {
    :first-child {
      margin-left: 0;
    }
    :last-child {
      margin-right: 0;
    }
  }
`;

const _ProductList: React.SFC<ProductListProps> = props => {
  return null;
  // TODO : remove comments after implement usePaginationQuery
  // const [openedProductId, setOpenedProductId] = React.useState<string>(null);
  // const { data: products } = usePaginationQuery(queryEndpoints.getAllProductsByCategoryId, {
  //   variables: { categoryId: props.selectedCategoryId },
  //   skip: !props.selectedCategoryId,
  // });
  // const { data: specifyProducts } = usePaginationQuery(queryEndpoints.getAllSpecifyProductsByProductId, {
  //   variables: { productId: openedProductId },
  //   skip: !openedProductId,
  // });
  // const chunkedArray = React.useMemo(
  //   () =>
  //     _chunk(
  //       products.map(product => ({
  //         id: product.id,
  //         name: product.name,
  //         taxRate: product.tax,
  //         img: product.photoUrl,
  //         barcode: product.barcode,
  //       })),
  //       CHUNK_SIZE,
  //     ),
  //   [products.length],
  // );

  // const __ = (
  //   <>
  //     {chunkedArray.map((items, index) => (
  //       <UICollapsible
  //         key={index}
  //         content={(trigger, isOpen) => (
  //           <StyledCardContainer>
  //             {items.map(product => (
  //               <ProductCard
  //                 key={product.id}
  //                 {...product}
  //                 onButtonClick={() => {
  //                   if (openedProductId !== product.id) {
  //                     setOpenedProductId(product.id);
  //                     trigger(true);
  //                   } else {
  //                     trigger(!isOpen);
  //                   }
  //                 }}
  //               />
  //             ))}
  //           </StyledCardContainer>
  //         )}
  //       >
  //         <UITable data={specifyProducts} rowCount={8} columns={TABLE_SHOWN_DATA} />
  //       </UICollapsible>
  //     ))}
  //   </>
  // );

  // return __;
};

const ProductList = _ProductList;

export { ProductList };
