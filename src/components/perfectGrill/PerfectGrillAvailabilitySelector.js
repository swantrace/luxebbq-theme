import { html, virtual } from '@apollo-elements/haunted';

const PerfectGrillAvailabilitySelector = virtual(
  ({ availability, handleAvailabilityChanged }) => {
    console.log(availability, handleAvailabilityChanged);
    return html`<div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="In-stock"
          value="true"
          ?checked=${availability.includes('true')}
          @change=${(e) => {
            const bothInputs = e.target
              .closest('.perfect-grill-selector-input')
              .querySelectorAll('input[type="checkbox"]');
            const payload = bothInputs
              .filter((input) => input.checked === true)
              .map((input) => input.value);
            handleAvailabilityChanged(payload);
          }}
        />
        <label class="form-check-label" for="In-stock">In-stock</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="Pre-order"
          value="false"
          ?checked=${availability.includes('false')}
          @change=${(e) => {
            const bothInputs = e.target
              .closest('.perfect-grill-selector-input')
              .querySelectorAll('input[type="checkbox"]');
            const payload = bothInputs
              .filter((input) => input.checked === true)
              .map((input) => input.value);
            handleAvailabilityChanged(payload);
          }}
        />
        <label class="form-check-label" for="Pre-order">Pre-order</label>
      </div>`;
  }
);

export default PerfectGrillAvailabilitySelector;
