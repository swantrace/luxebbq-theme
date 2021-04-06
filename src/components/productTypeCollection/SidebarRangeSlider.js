import { html, virtual } from '@apollo-elements/haunted';
import slugify from 'slugify';

const SidebarRangeSlider = virtual(({ state, filter, handleValueUpdated }) => {
  const {
    title: rangeTitle,
    info: [min, max],
    stateKey,
  } = filter;
  const [valueMin, valueMax] = state[stateKey];
  return html`<div class="collection-collapse-block">
    <h3 class="collapse-block-title">${rangeTitle}</h3>
    <div class="collection-collapse-block-content">
      <div
        class="collection-range-slider-wrapper ${slugify(rangeTitle, {
          lower: true,
        })}-range-slider-wrapper collection-sidebar-filter mt-4"
      >
        <paper-range-slider
          id=${`${slugify(rangeTitle, {
            lower: true,
          })}-range-slider`}
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
            > paper-range-slider:before {
            content: '${valueMin}';
          }
          .${slugify(rangeTitle, {
              lower: true,
            })}-range-slider-wrapper
            > paper-range-slider:after {
            content: '${valueMax}';
          }
        </style>
      </div>
    </div>
  </div>`;
});

export default SidebarRangeSlider;
