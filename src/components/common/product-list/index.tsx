import * as React from 'react';
import styled from '~/styled';
import _chunk from 'lodash.chunk';
import { ProductCardWrapper, ProductCard, ProductData } from '../product-card';
import { UICollapsible, UITable } from '~/components/ui';
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
  items: ProductData[];
  selectedProductSpecifies: SpecifyProductData[];
  onItemClick?: (id: string) => void;
}

const CHUNK_SIZE = 4;

const TABLE_SHOWN_DATA: UITableColumns<SpecifyProductData>[] = [
  {
    props: 'sellerName',
    text: 'Satici',
  },
  {
    props: 'totalPrice',
    text: 'Toplam fiyat',
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
  const chunkedArray = React.useMemo(() => _chunk(props.items, CHUNK_SIZE), [props.items]);
  const [openedProductId, setOpenedProductId] = React.useState<string>(null);
  const __ = (
    <>
      {chunkedArray.map((items, index) => (
        <UICollapsible
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
                      if (props.onItemClick) {
                        props.onItemClick(product.id);
                      }
                    } else {
                      trigger(!isOpen);
                    }
                  }}
                />
              ))}
            </StyledCardContainer>
          )}
        >
          <UITable data={props.selectedProductSpecifies} rowCount={8} columns={TABLE_SHOWN_DATA} />
        </UICollapsible>
      ))}
    </>
  );

  return __;
};

const ProductList = _ProductList;

export { ProductList };
