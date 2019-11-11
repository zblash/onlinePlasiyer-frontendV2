import * as React from 'react';
import _chunk from 'lodash.chunk';
import { UITableColumns, UITable } from '~/components/ui/table';
import { usePaginationQuery } from '~/services/pagination-query-context/context';
import { ProductCardWrapper, ProductCard } from '../product-card';
import styled from '~/styled';
import { paginationQueryEndpoints } from '~/services/pagination-query-context/pagination-query-endpoints';
import { UICollapsible } from '~/components/ui';
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
  const [openedProductId, setOpenedProductId] = React.useState<string>(null);
  const { data: products } = usePaginationQuery(paginationQueryEndpoints.getAllProductsByCategoryId, {
    variables: { categoryId: props.selectedCategoryId },
    skip: !props.selectedCategoryId,
    defaultValue: [],
  });
  const { data: specifyProducts } = usePaginationQuery(paginationQueryEndpoints.getAllSpecifyProductsByProductId, {
    variables: { productId: openedProductId },
    defaultValue: [],
    skip: !openedProductId,
  });
  const chunkedArray = React.useMemo(
    () =>
      _chunk(
        products.map(product => ({
          id: product.id,
          name: product.name,
          taxRate: product.tax,
          img: product.photoUrl,
          barcode: product.barcode,
        })),
        CHUNK_SIZE,
      ),
    [JSON.stringify(products)],
  );

  const __ = (
    <>
      {chunkedArray.map((items, index) => (
        <UICollapsible
          closeForce={openedProductId === null}
          key={index}
          content={(trigger, isOpen) => (
            <StyledCardContainer>
              {items.map(product => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onButtonClick={() => {
                    if (openedProductId !== product.id) {
                      setOpenedProductId(product.id);
                      trigger(true);
                    } else {
                      trigger(!isOpen);
                    }
                  }}
                />
              ))}
            </StyledCardContainer>
          )}
        >
          <UITable id={props.selectedCategoryId} data={specifyProducts} rowCount={8} columns={TABLE_SHOWN_DATA} />
        </UICollapsible>
      ))}
    </>
  );

  React.useEffect(() => {
    setOpenedProductId(null);
  }, [props.selectedCategoryId]);

  return __;
};

const ProductList = _ProductList;

export { ProductList };
