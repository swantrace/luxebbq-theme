import { html, virtual } from '@apollo-elements/haunted';

const PerfectGrillAvailabilitySelector = virtual(
  ({ availability, handleAvailabilityChanged }) =>
    // console.log(availability, handleAvailabilityChanged);
    html`<div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          id="show-all"
          name="perfect-availability"
          ?checked=${availability.includes('true') &&
          availability.includes('false')}
          @change=${(e) => {
            if (e.target.checked) {
              handleAvailabilityChanged(['true', 'false']);
            }
          }}
        />
        <label class="form-check-label" for="show-all">Show All</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          id="in-stock"
          value="false"
          name="perfect-availability"
          ?checked=${availability.includes('true') &&
          !availability.includes('false')}
          @change=${(e) => {
            if (e.target.checked) {
              handleAvailabilityChanged(['true']);
            }
          }}
        />
        <label class="form-check-label" for="in-stock">In Stock Only</label>
      </div>`
);

export default PerfectGrillAvailabilitySelector;
