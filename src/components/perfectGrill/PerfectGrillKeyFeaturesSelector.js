import { html, virtual } from '@apollo-elements/haunted';
import uniq from 'lodash.uniq';

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
  }) =>
    html`<div class="form-check form-check-inline">
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
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="castIronGrill"
          ?checked=${selectedGrillTypes.includes('Cast Iron Grill')}
          @change=${() => {
            handleGrillTypeChanged(
              uniq([...selectedGrillTypes, 'Cast Iron Grill'])
            );
          }}
        />
        <label class="form-check-label" for="castIronGrill"
          >Cast Iron Grill</label
        >
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="stainlessSteelGrill"
          ?checked=${selectedGrillTypes.includes('Stainless Steel Grill')}
          @change=${() => {
            handleGrillTypeChanged(
              uniq([...selectedGrillTypes, 'Stainless Steel Grill'])
            );
          }}
        />
        <label class="form-check-label" for="stainlessSteelGrill"
          >Stainless Steel Grill</label
        >
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="ceramicCoatedGrill"
          ?checked=${selectedGrillTypes.includes('Ceramic Coated Grill')}
          @change=${() => {
            handleGrillTypeChanged(
              uniq([...selectedGrillTypes, 'Ceramic Coated Grill'])
            );
          }}
        />
        <label class="form-check-label" for="ceramicCoatedGrill"
          >Ceramic Coated Grill</label
        >
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="freeStanding"
          ?checked=${selectedStandTypes.includes('Free Standing')}
          @change=${() => {
            handleStandTypeChanged(
              uniq([...selectedStandTypes, 'Free Standing'])
            );
          }}
        />
        <label class="form-check-label" for="freeStanding">Free Standing</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="builtIn"
          ?checked=${selectedStandTypes.includes('Built In')}
          @change=${() => {
            handleStandTypeChanged(uniq([...selectedStandTypes, 'Built In']));
          }}
        />
        <label class="form-check-label" for="builtIn">Built In</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="portable"
          ?checked=${selectedStandTypes.includes('Portable')}
          @change=${() => {
            handleStandTypeChanged(uniq([...selectedStandTypes, 'Portable']));
          }}
        />
        <label class="form-check-label" for="portable">Portable</label>
      </div>`
);

export default PerfectGrillKeyFeaturesSelector;
