import * as React from 'react';
import _chunk from 'lodash.chunk';
import { UITableColumns, UITable } from '~/components/ui/table';
import { ProductCardWrapper, ProductCard, ProductData } from '../product-card';
import styled, { css } from '~/styled';
import { UICollapsible } from '~/components/ui';
/*
  ProductList Helpers
*/

export interface SpecifyProductData {
  id: string;
  sellerName: string;
  totalPrice: number;
}
export interface ProductListComponentProps {
  selectedCategoryId: string;
  onChangeExpandProductId?: (id: string) => void;
  onChangeSpecifyProductPage?: (pageNumber: number, totalPageCount: number) => void;
}
interface ProductListData {
  products: ProductData[];
  specifyProducts: SpecifyProductData[];
}
interface ProductListProps extends ProductListComponentProps, ProductListData {}

/*
  ProductList Constants
*/

const CHUNK_SIZE = 4;
const SPECIFY_PRODUCT_ROW_COUNT = 8;

const TABLE_SHOWN_DATA: UITableColumns<SpecifyProductData>[] = [
  {
    itemRenderer: specifyProduct => specifyProduct.sellerName,
    title: 'Satici',
  },
  {
    itemRenderer: specifyProduct => specifyProduct.totalPrice,
    title: 'Toplam fiyat',
  },
];

/*
  ProductList Colors // TODO : move theme.json
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

const tableStyle = css`
  margin-bottom: 16px;
`;

const ProductList: React.SFC<ProductListProps> = props => {
  const [expandProductId, setExpandProductId] = React.useState<string>(null);

  const chunkedArray = React.useMemo(() => _chunk(props.products, CHUNK_SIZE), [JSON.stringify(props.products)]);

  const __ = (
    <>
      {chunkedArray.map((items, index) => (
        <UICollapsible
          closeForce={expandProductId === null}
          key={index}
          content={(trigger, isOpen) => (
            <StyledCardContainer>
              {items.map(product => (
                <ProductCard
                  isExpand={product.id === expandProductId}
                  key={product.id}
                  {...product}
                  onButtonClick={() => {
                    if (expandProductId !== product.id) {
                      setExpandProductId(product.id);
                      if (props.onChangeExpandProductId) {
                        props.onChangeExpandProductId(product.id);
                      }
                      trigger(true);
                    } else {
                      trigger(!isOpen);
                      setExpandProductId(null);
                      if (props.onChangeExpandProductId) {
                        props.onChangeExpandProductId(null);
                      }
                    }
                  }}
                />
              ))}
            </StyledCardContainer>
          )}
        >
          <UITable
            id={expandProductId}
            data={props.specifyProducts}
            rowCount={SPECIFY_PRODUCT_ROW_COUNT}
            columns={TABLE_SHOWN_DATA}
            onChangePage={props.onChangeSpecifyProductPage}
            className={tableStyle}
          />
        </UICollapsible>
      ))}
    </>
  );

  React.useEffect(() => {
    setExpandProductId(null);
  }, [props.selectedCategoryId]);

  return __;
};

export { ProductList };
