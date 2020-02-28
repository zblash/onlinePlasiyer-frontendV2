import * as React from 'react';
import Select from 'react-select';
import styled, { colors, css } from '~/styled';
import { UIInput, UIButton, UIIcon } from '~/components/ui';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { refetchFactory } from '~/services/utils';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { useAlert } from '~/utils/hooks';

/* CreateProductComponent Helpers */
interface CreateProductComponentProps {
  hasBarcode?: (barcode: string) => void;
  onCreate?: (barcode: string) => void;
}

/* CreateProductComponent Constants */

/* CreateProductComponent Styles */

const StyledContent = styled.div`
  width: 100%;
`;
const StyledContentElement = styled.div`
  width: 100%;
`;
const StyledInput = styled(UIInput)`
  width: 99%;
  padding-left: 1%;
  height: 35px;
  margin-bottom: 10px;
  border: 2px solid ${colors.lightGray};
`;
const loadingStyle = css``;
const StyledButton = styled(UIButton)<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  border: 1px solid ${colors.primary};
  color: ${colors.primary};
  background-color: ${colors.white};
  text-align: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'cursor')};
  text-decoration: none;
  border-radius: 4px;
  :hover {
    color: ${props => (props.disabled ? colors.primary : colors.white)};
    background-color: ${props => (props.disabled ? colors.white : colors.primary)};
    ${props =>
      props.disabled
        ? ''
        : `
    .${loadingStyle}:after {
      border-color: ${colors.white} transparent;
    }
  `}
  }
  :active {
    background-color: ${colors.primaryDark};
  }
  transition: background-color 0.3s, color 0.3s;
`;
const StyledHiddenFilePicker = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -999;
  pointer-events: none;
`;

const StyledCategoryImg = styled.img`
  object-fit: cover;
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const StyledCategoryImgWrapper = styled.label`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: 24px;
  border-radius: 50%;
  border: 2px solid ${colors.primary};
  cursor: pointer;
`;

const imageIconStyle = css`
  padding: 8px;
`;
const barcodeInput = css`
  width: 70%;
  float: left;
`;
const label = css`
  width: 100%;
  float: left;
`;
const barcodeCheckBtn = css`
  float: right;
`;
const selectInput = css`
  margin-bottom: 10px;
`;
const overFlow = css`
  overflow: auto;
`;
/* CreateProductComponent Component  */
function CreateProductComponent(props: React.PropsWithChildren<CreateProductComponentProps>) {
  /* CreateProductComponent Variables */
  const barcodeRef = React.useRef(true);
  const alert = useAlert();
  const [imgSrc, setImgSrc] = React.useState();
  const [img, setImg] = React.useState<File>(null);
  const [barcode, setBarcode] = React.useState('');
  const [productName, setProductName] = React.useState('');
  const [isBarcodeSaved, setIsBarcodeSaved] = React.useState(false);
  const [parentCategory, setParentCategory] = React.useState({ value: '', label: '' });
  const [subCategory, setSubCategory] = React.useState({ value: '', label: '' });
  const [tax, setTax] = React.useState({
    value: 0,
    label: '0%',
  });
  const taxOptions = [
    { value: 0, label: '0%' },
    { value: 1, label: '1%' },
    { value: 8, label: '8%' },
    { value: 18, label: '18%' },
  ];
  const { mutation: checkProduct } = useMutation(mutationEndPoints.hasProduct, {
    variables: { barcode },
  });
  const { mutation: createProduct } = useMutation(mutationEndPoints.createProduct, {
    refetchQueries: [
      refetchFactory(paginationQueryEndpoints.getAllProductsByCategoryId, { categoryId: subCategory.value }),
    ],
    variables: {
      barcode,
      categoryId: subCategory.value,
      name: productName,
      uploadedFile: img,
      tax: tax.value,
    },
  });
  const { data: parentCategories, loading: parentCatLoading } = useQuery(queryEndpoints.getCategories, {
    defaultValue: [],
    variables: { type: 'parent' },
    skip: !isBarcodeSaved || barcodeRef.current,
  });
  const { data: subCategories, loading: subCatLoading } = useQuery(queryEndpoints.getSubCategoriesByParentId, {
    defaultValue: [],
    variables: { parentId: parentCategory.value },
    skip: !parentCategory.value,
  });
  const { data: product, loading: productLoading } = useQuery(queryEndpoints.getProductByBarcode, {
    defaultValue: {},
    variables: { barcode },
    skip: !isBarcodeSaved && barcodeRef.current,
  });
  /* CreateProductComponent Callbacks */
  const handleBarcodeSearch = React.useCallback(() => {
    checkProduct().then(({ hasBarcode }) => {
      setIsBarcodeSaved(hasBarcode);
      barcodeRef.current = false;
      if (!hasBarcode) {
        alert.show('Urun sistemde bulunamadi siz ekleyebilirsiniz.', { type: 'error' });
      }
    });
  }, [alert, checkProduct, barcodeRef]);

  const handleSubmit = React.useCallback(() => {
    if (!isBarcodeSaved && barcodeRef.current) {
      createProduct()
        .then(() => {
          if (props.onCreate) {
            props.onCreate(barcode);
            alert.show('Urun tanimlamasi basariyla eklendi, devam edebilirsiniz', { type: 'success' });
          }
        })
        .catch(() => {
          alert.show('Urun Eklenirken Hata Olustu', { type: 'error' });
        });
    } else if (isBarcodeSaved && barcode) {
      props.hasBarcode(barcode);
      alert.show('Urun sistemden bulundu, devam edebilirsiniz', { type: 'success' });
    } else {
      alert.show('Urun sistemde bulunamadi veya sisteme eklenirken hata olustu', { type: 'error' });
    }
  }, [alert, barcode, createProduct, isBarcodeSaved, props]);

  /* CreateProductComponent Lifecycle  */
  React.useEffect(() => {
    if (!productLoading && barcode) {
      setProductName(product.name);
      setTax({ value: product.tax, label: `${product.tax}%` });
      setSubCategory({ value: product.categoryId, label: product.categoryName });
      setImgSrc(product.photoUrl);
    }
  }, [productLoading]); // eslint-disable-line

  return (
    <StyledContent>
      <StyledContentElement className={overFlow}>
        <label className={label}>Barkod Girin</label>
        <StyledInput className={barcodeInput} id="barcode" value={barcode} onChange={e => setBarcode(e)} />
        <StyledButton
          className={barcodeCheckBtn}
          disabled={!barcode || barcode.length !== 13}
          onClick={handleBarcodeSearch}
        >
          Sorgula
        </StyledButton>
      </StyledContentElement>
      <StyledContentElement>
        <label>Urun Ismi</label>
        <StyledInput
          id="product-name"
          readOnly={isBarcodeSaved}
          value={productName}
          onChange={e => setProductName(e)}
        />
      </StyledContentElement>
      <StyledContentElement>
        <label>Vergi Orani:</label>
        <Select
          options={taxOptions}
          placeholder="Secim Yapin"
          className={selectInput}
          value={tax}
          onChange={e => setTax(e)}
          isDisabled={isBarcodeSaved}
        />
      </StyledContentElement>
      <StyledContentElement>
        <label>Ana Kategori</label>
        <Select
          options={parentCategories.map(category => {
            return { value: category.id, label: category.name };
          })}
          placeholder="Secim Yapin"
          className={selectInput}
          value={parentCategory}
          onChange={e => setParentCategory(e)}
          isDisabled={isBarcodeSaved || barcodeRef.current || parentCatLoading}
        />
      </StyledContentElement>
      <StyledContentElement>
        <label>Alt Kategori</label>
        <Select
          options={subCategories.map(category => {
            return { value: category.id, label: category.name };
          })}
          placeholder="Secim Yapin"
          className={selectInput}
          value={subCategory}
          onChange={e => setSubCategory(e)}
          isDisabled={isBarcodeSaved || subCatLoading || !parentCategory.value}
        />
      </StyledContentElement>
      <StyledContentElement>
        <label>Urun Resmi</label>
        <StyledHiddenFilePicker
          hidden
          disabled={isBarcodeSaved}
          id="product-image"
          type="file"
          onChange={event => {
            if (event.target.files && event.target.files[0]) {
              const file = event.target.files[0];
              const reader = new FileReader();
              reader.onload = e => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                setImgSrc(e.target.result as string);
                setImg(file);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <StyledCategoryImgWrapper htmlFor="product-image">
          {imgSrc && <StyledCategoryImg src={imgSrc} />}
          {!imgSrc && <UIIcon name="photoCamera" size={42} className={imageIconStyle} />}
        </StyledCategoryImgWrapper>
      </StyledContentElement>
      <StyledContentElement>
        <StyledButton disabled={!productName || !barcode || !tax || !subCategory} onClick={handleSubmit}>
          Devam Et
        </StyledButton>
      </StyledContentElement>
    </StyledContent>
  );
}
const PureCreateProductComponent = React.memo(CreateProductComponent);

export { PureCreateProductComponent as CreateProductComponent };
