import { html, virtual } from '@apollo-elements/haunted';
import slugify from 'slugify';

const SidebarRangeSlider = virtual(({ state, filter, handleValueUpdated }) => {
  const {
    title: rangeTitle,
    info: [min, max, step],
    stateKey,
  } = filter;
  const [valueMin, valueMax] = state[stateKey];
  return html`<div class="collection-collapse-block">
    <h3 class="collapse-block-title pb-4">${rangeTitle}</h3>
    <div class="collection-collapse-block-content">
      <div
        class="collection-range-slider-wrapper ${slugify(rangeTitle, {
          lower: true,
        })}-range-slider-wrapper collection-sidebar-filter mt-4"
      >
        <style is="custom-style">
          #${slugify(rangeTitle, {
              lower: true,
            })}-range-slider {
            width: 100%;
            --paper-range-slider-width: 100%;
            --primary-color: #fb711c;
            --paper-single-range-slider-height: 4px;
          }
        </style>
        <paper-range-slider
          id=${`${slugify(rangeTitle, {
            lower: true,
          })}-range-slider`}
          always-show-pin
          step=${step}
          min=${min}
          max=${max}
          value-min=${valueMin}
          value-max=${valueMax}
          @updateValues=${(e) => handleValueUpdated(filter, e)}
        ></paper-range-slider>
        <style>
          .${slugify(rangeTitle, {
              lower: true,
            })}-range-slider-wrapper
            > paper-range-slider {
            --primary-color: #fb711c;
            --paper-single-range-slider-height: 4px;
          }
        </style>
        ${filter.actionType === 'changePriceRange'
          ? html`<div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="show-over-6500"
                @change=${(e) =>
                  e.target.checked
                    ? handleValueUpdated(filter, {
                        target: { valueMin: 6500, valueMax: Infinity },
                      })
                    : handleValueUpdated(filter, {
                        target: { valueMin: 0, valueMax: 6500 },
                      })}
              />
              <label class="form-check-label" for="show-over-6500"
                >Show Grills Over $6500</label
              >
            </div>`
          : null}
      </div>
    </div>
  </div>`;
});

export default SidebarRangeSlider;
