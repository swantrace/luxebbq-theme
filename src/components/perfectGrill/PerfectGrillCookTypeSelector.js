import { html, virtual } from '@apollo-elements/haunted';

const PerfectGrillCookTypeSelector = virtual(
  ({
    cookTypeLogos,
    selectedCookTypesAndBrands,
    handleSelectedCookTypesAndBrandsChanged,
  }) => {
    // console.log(
    //   cookTypeLogos,
    //   selectedCookTypesAndBrands,
    //   handleSelectedCookTypesAndBrandsChanged
    // );
    const selectedCookType =
      Object.keys(selectedCookTypesAndBrands)?.[0] ?? 'Gas Grill';
    return html` ${Object.entries(cookTypeLogos).map(
      ([cookType, icon]) => html`
        <div
          class=${`cook-type-logo-wrapper${
            selectedCookType === cookType ? ' active' : ''
          }`}
          @click=${(e) =>
            handleSelectedCookTypesAndBrandsChanged(
              selectedCookTypesAndBrands[cookType]
                ? selectedCookTypesAndBrands
                : { [cookType]: [] }
            )}
        >
          <i class="icon-Grill iconfont text-center"></i>
          <div class="icon-label text-center w-100">${cookType}</div>
        </div>
      `
    )}`;
  }
);

export default PerfectGrillCookTypeSelector;
