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
      value="${selectedCookTypesAndBrands?.[0]?.[1]?.[0]}"
      @change=${(e) =>
        handleSelectedCookTypesAndBrandsChanged([
          [selectedCookTypesAndBrands[0][0], [e.target.value]],
        ])}
    >
      <option
        value
        ?selected=${(selectedCookTypesAndBrands?.[0]?.[1] ?? []).length === 0}
      >
        Select a brand
      </option>
      ${brandInfo
        ?.find(
          ([cookType]) =>
            cookType === selectedCookTypesAndBrands?.[0]?.[0] ?? 'Gas Grill'
        )?.[1]
        ?.map(
          (brand) =>
            html`<option
              ?selected=${brand === selectedCookTypesAndBrands?.[0]?.[1]?.[0]}
              value=${brand}
            >
              ${brand}
            </option>`
        )}
    </select>`;
  }
);

export default PerfectGrillBrandSelector;
