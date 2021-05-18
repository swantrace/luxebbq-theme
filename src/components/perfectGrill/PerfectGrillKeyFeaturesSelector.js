import { html, virtual } from '@apollo-elements/haunted';
import uniq from 'lodash.uniq';
import slugify from 'slugify';

const PerfectGrillKeyFeaturesSelector = virtual(
  ({
    sideBurner,
    searBurner,
    rearRotisserie,
    selectedGrillTypes,
    selectedStandTypes,
    handleSideBurnerChanged,
    handleSearBurnerChanged,
    handleRearRotisserieChanged,
    handleGrillTypeChanged,
    handleStandTypeChanged,
  }) => {
    const onSomeTypeChanged = (types, handleFunc, currentType, e) => {
      if (e.target.checked) {
        handleFunc(uniq([...types, currentType]));
      } else {
        handleFunc(types.filter((t) => t !== currentType));
      }
    };
    return html`<div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="sideBurner"
          ?checked=${!!sideBurner}
          @change=${(e) => {
            handleSideBurnerChanged(e.target.checked);
          }}
        />
        <label class="form-check-label" for="sideBurner">Side Burner</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="searBurner"
          ?checked=${searBurner}
          @change=${(e) => {
            handleSearBurnerChanged(e.target.checked);
          }}
        />
        <label class="form-check-label" for="searBurner">Sear Burner</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="rearRotisserie"
          ?checked=${rearRotisserie}
          @change=${(e) => {
            handleRearRotisserieChanged(e.target.checked);
          }}
        />
        <label class="form-check-label" for="rearRotisserie"
          >Rear Rotisserie</label
        >
      </div>
      ${[
        'Cast Iron Grill',
        'Stainless Steel Grill',
        'Ceramic Coated Grill',
      ].map(
        (currentType) => html`
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id=${slugify(currentType, { lower: true })}
              ?checked=${selectedGrillTypes.includes(currentType)}
              @change=${(e) =>
                onSomeTypeChanged(
                  selectedGrillTypes,
                  handleGrillTypeChanged,
                  currentType,
                  e
                )}
            />
            <label
              class="form-check-label"
              for=${slugify(currentType, { lower: true })}
              >${currentType}</label
            >
          </div>
        `
      )}
      ${['Free Standing', 'Built In', 'Portable'].map(
        (currentType) => html`
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id=${slugify(currentType, { lower: true })}
              ?checked=${selectedStandTypes.includes(currentType)}
              @change=${(e) =>
                onSomeTypeChanged(
                  selectedStandTypes,
                  handleStandTypeChanged,
                  currentType,
                  e
                )}
            />
            <label
              class="form-check-label"
              for=${slugify(currentType, { lower: true })}
              >${currentType}</label
            >
          </div>
        `
      )}`;
  }
);

export default PerfectGrillKeyFeaturesSelector;
