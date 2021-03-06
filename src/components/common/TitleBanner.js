import { html, virtual } from '@apollo-elements/haunted';

const TitleBanner = virtual(
  ({
    classList = [
      'collection-banner',
      'd-flex',
      'justify-content-between',
      'align-items-center',
    ],
    title,
  }) => html`<div class=${classList.join(' ')}>
    <h2 class="banner-name dtm-banner-name">${title}</h2>
    <div class="parallelograms-group dtm-parallelograms-group">
      <span class="parallelograms parallelogram-lt dtm-parallelograms"> </span>
      <span class="parallelograms parallelogram-rt dtm-parallelograms"> </span>
      <span class="parallelograms parallelogram-br dtm-parallelograms"> </span>
    </div>
  </div>`
);

export default TitleBanner;
