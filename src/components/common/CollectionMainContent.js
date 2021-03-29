import { html, virtual } from '@apollo-elements/haunted';
import TitleBanner from './TitleBanner';

const CollectionMainContent = virtual(
  ({ title, productType }) => html`<div class="collection-content col">
    <div class="page-main-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12">
            ${TitleBanner({
              title,
            })}
            <product-list-top-controllers
              .productType=${productType}
            ></product-list-top-controllers>
            <product-list .productType=${productType}></product-list>
            <product-list-pagination
              .productType=${productType}
            ></product-list-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>`
);

export default CollectionMainContent;
