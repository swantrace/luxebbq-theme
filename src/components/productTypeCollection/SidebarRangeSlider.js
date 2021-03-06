/* eslint-disable no-nested-ternary */
import { html, virtual } from '@apollo-elements/haunted';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import slugify from 'slugify';

const SidebarRangeSlider = virtual(({ state, filter, handleValueUpdated }) => {
  const {
    title: rangeTitle,
    info: [min, max, step, description],
    stateKey,
  } = filter;
  const [valueMin, valueMax] = state[stateKey];

  return html`<div class="collection-collapse-block">
    <h3 class="collapse-block-title pb-4">${unsafeHTML(rangeTitle)}</h3>
    <div class="collection-collapse-block-content">
      <div
        class="collection-range-slider-wrapper ${slugify(
          rangeTitle.split('br')[0],
          {
            lower: true,
          }
        )}-range-slider-wrapper collection-sidebar-filter mt-4"
      >
        <style is="custom-style">
          #${slugify(rangeTitle.split('br')[0], {
              lower: true,
            })}-range-slider {
            width: 100%;
            --paper-range-slider-width: 100%;
            --primary-color: #fb711c;
            --paper-single-range-slider-height: 4px;
          }
        </style>
        <paper-range-slider
          id=${`${slugify(rangeTitle.split('br')[0], {
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
        ${description
          ? html`<h3 class="collapse-block-title mt-0">${description}</h3>`
          : null}
      </div>
    </div>
  </div>`;
});

export default SidebarRangeSlider;
