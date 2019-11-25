import * as React from 'react';
import _chunk from 'lodash.chunk';
import ReactPaginate from 'react-paginate';
import lodashDebounce from 'lodash.debounce';
import { UITableColumns, UITable } from '~/components/ui/table';
import { ProductCardWrapper, ProductCard, ProductData } from '../product-card';
import styled, { css, colors } from '~/styled';
import { UICollapsible } from '~/components/ui';
import { SpecifyAddtoCart } from './specify-add-to-cart';
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
  onChangePage?: (pageNumber: number) => void;
}
interface ProductListData {
  products: ProductData[];
  specifyProducts: SpecifyProductData[];
  productsLastPageIndex: number;
  productsCurrentPage: number;
  productsPageCount: number;
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
  {
    itemRenderer: specifyProduct => <SpecifyAddtoCart key={specifyProduct.id} specifyProductId={specifyProduct.id} />,
    title: 'Sepete Ekle',
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
const StyledProductListContainer = styled.div``;
const activeStyle = css``;
const StyledPaginateWrapper = styled.div`
  > ul li {
    > a {
      :hover {
        :not(.${activeStyle}) {
          z-index: 3;
          color: ${colors.paginate.darkBlue};
          background-color: ${colors.lightGray};
        }
      }
      outline: none;
      user-select: none;
      position: relative;
      float: left;
      padding: 6px 12px;
      margin-left: -1px;
      line-height: 1.42857143;
      text-decoration: none;
      border: 1px solid;
      z-index: 2;
      color: ${colors.white};
      cursor: default;
      background-color: ${colors.paginate.blue};
      border-color: ${colors.paginate.blue};
      :not(.${activeStyle}) {
        cursor: pointer;
        color: ${colors.paginate.blue};
        background-color: ${colors.white};
      }
    }
  }
`;

const containerStyle = css`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductList: React.SFC<ProductListProps> = props => {
  const [expandProductId, setExpandProductId] = React.useState<string>(null);
  const chunkedArray = React.useMemo(() => _chunk(props.products, CHUNK_SIZE), [props.products]);

  React.useEffect(() => {
    setExpandProductId(null);
  }, [props.selectedCategoryId]);
  const onPageChange = React.useCallback(
    lodashDebounce(({ selected: pageIndex }: { selected: number }) => {
      props.onChangePage(pageIndex + 1);
    }, 150),
    [props],
  );

  return (
    <StyledProductListContainer>
      {chunkedArray.map((items, index) => (
        <UICollapsible
          lazyRender
          closeForce={!items.find(item => item.id === expandProductId)}
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
      <StyledPaginateWrapper>
        <ReactPaginate
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          activeLinkClassName={activeStyle}
          containerClassName={containerStyle}
          pageCount={props.productsPageCount}
          onPageChange={onPageChange}
        />
      </StyledPaginateWrapper>
    </StyledProductListContainer>
  );
};

export { ProductList };
