import * as React from 'react';
import _chunk from 'lodash.chunk';
import ReactPaginate from 'react-paginate';
import lodashDebounce from 'lodash.debounce';
import { UITableColumns, UITable } from '~/components/ui/table';
import { ProductCardWrapper, ProductCard, ProductData } from '../product-card';
import styled, { css, colors } from '~/styled';
import { UICollapsible } from '~/components/ui';
import { SpecifyAddtoCart } from './specify-add-to-cart';
import { UnitTypeResponse } from '~/services/helpers/backend-models';
import { useApplicationContext } from '~/app/context';
/*
  ProductList Helpers
*/

export interface SpecifyProductData {
  id: string;
  sellerName: string;
  totalPrice: number;
  quantity: number;
  recommendedRetailPrice: number;
  unitPrice: number;
  unitType: UnitTypeResponse;
  contents: number;
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
  specifyProductsTotalPage: number;
  specifyProductsElementCountOfPage: number;
  productsLastPageIndex: number;
  productsCurrentPage: number;
  productsPageCount: number;
}
interface ProductListProps extends ProductListComponentProps, ProductListData {}

/*
  ProductList Constants
*/

const CHUNK_SIZE = 4;

const TABLE_SHOWN_DATA: UITableColumns<SpecifyProductData>[] = [
  {
    itemRenderer: specifyProduct => specifyProduct.sellerName,
    title: 'Satici',
  },
  {
    itemRenderer: specifyProduct => specifyProduct.quantity,
    title: 'Stok Durumu',
  },
  {
    itemRenderer: specifyProduct => specifyProduct.unitType,
    title: 'Birim',
  },
  {
    itemRenderer: specifyProduct => specifyProduct.unitPrice,
    title: 'Birim Fiyati',
  },
  {
    itemRenderer: specifyProduct => specifyProduct.contents,
    title: 'Birim Icerigi',
  },
  {
    itemRenderer: specifyProduct => specifyProduct.recommendedRetailPrice,
    title: 'T.E.S. Tutari',
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
  const applicationContext = useApplicationContext();
  React.useEffect(() => {
    setExpandProductId(null);
  }, [props.selectedCategoryId]);

  React.useEffect(() => {
    if (applicationContext.user.isCustomer) {
      TABLE_SHOWN_DATA.push({
        itemRenderer: specifyProduct => <SpecifyAddtoCart key={specifyProduct.id} specifyProduct={specifyProduct} />,
        title: 'Sepete Ekle',
      });
    }
  }, []); // eslint-disable-line

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
            rowCount={props.specifyProductsElementCountOfPage > 0 ? props.specifyProductsElementCountOfPage : 20}
            totalPageCount={props.specifyProductsTotalPage}
            columns={TABLE_SHOWN_DATA}
            onChangePage={props.onChangeSpecifyProductPage}
            className={tableStyle}
          />
        </UICollapsible>
      ))}
      {props.products.length > 0 && (
        <StyledPaginateWrapper>
          <ReactPaginate
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            activeLinkClassName={activeStyle}
            forcePage={props.productsCurrentPage - 1}
            containerClassName={containerStyle}
            pageCount={props.productsPageCount}
            onPageChange={onPageChange}
          />
        </StyledPaginateWrapper>
      )}
    </StyledProductListContainer>
  );
};

export { ProductList };
