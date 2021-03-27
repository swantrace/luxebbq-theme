import { html, virtual } from '@apollo-elements/haunted';

const PerfectGrillBrandSelector = virtual(
  ({
    brandInfo,
    selectedCookTypesAndBrands,
    handleSelectedCookTypesAndBrandsChanged,
  }) => {
    console.log(
      brandInfo,
      selectedCookTypesAndBrands,
      handleSelectedCookTypesAndBrandsChanged
    );
    return html`<select
      class="w-100"
      value=${Object.values(selectedCookTypesAndBrands)?.[0]}
      @change=${(e) =>
        handleSelectedCookTypesAndBrandsChanged({
          [Object.keys(selectedCookTypesAndBrands)?.[0] ?? 'Gas Grill']: e
            .target.value
            ? [e.target.value]
            : null,
        })}
    >
      <option
        value
        ?selected=${(Object.values(selectedCookTypesAndBrands)?.[0]?.length ??
          0) === 0}
      >
        Select a brand
      </option>
      ${brandInfo?.[
        Object.keys(selectedCookTypesAndBrands)?.[0] ?? 'Gas Grills'
      ]?.map(
        (brand) =>
          html`<option
            ?selected=${brand ===
            Object.values(selectedCookTypesAndBrands)?.[0]}
            value=${brand}
          >
            ${brand}
          </option>`
      )}
    </select>`;
  }
);

export default PerfectGrillBrandSelector;
