import { html, virtual } from '@apollo-elements/haunted';

const PerfectGrillCookTypeSelector = virtual(
  ({
    cookTypeLogos,
    selectedCookTypesAndBrands,
    handleSelectedCookTypesAndBrandsChanged,
  }) => {
    const selectedCookType =
      Object.keys(selectedCookTypesAndBrands)?.[0] ?? 'Gas Grill';
    return html` ${Object.entries(cookTypeLogos).map(
      ([cookType, iconClass]) => html`
        <div
          class=${`cook-type-logo-wrapper${
            selectedCookType === cookType ? ' active' : ' inactive'
          }`}
          @click=${() =>
            handleSelectedCookTypesAndBrandsChanged(
              selectedCookTypesAndBrands[cookType]
                ? selectedCookTypesAndBrands
                : { [cookType]: [] }
            )}
        >
          <i class="icon-${iconClass} iconfont text-center"></i>
        </div>
      `
    )}`;
  }
);

export default PerfectGrillCookTypeSelector;
