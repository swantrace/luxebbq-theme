import { html, virtual } from '@apollo-elements/haunted';

const ProductListLoading = virtual(
  ({
    height = '24px',
    marginBottom = '8px',
    marginTop = '0',
    customClass = 'top-controllers-loading',
  } = {}) => html`<div class=${`product-list-spinner ${customClass}`}>
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
    <style>
      .${customClass}.product-list-spinner {
        margin: 0 auto;
        width: 100%;
        height: ${height};
        text-align: center;
        font-size: 10px;
        margin-bottom: ${marginBottom};
        margin-top: ${marginTop};
      }
      .${customClass}.product-list-spinner > div {
        background-color: #fb711c;
        height: 100%;
        width: 6px;
        display: inline-block;
        -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
        animation: sk-stretchdelay 1.2s infinite ease-in-out;
      }
      .${customClass}.product-list-spinner .rect2 {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
      }
      .${customClass}.product-list-spinner .rect3 {
        -webkit-animation-delay: -1s;
        animation-delay: -1s;
      }
      .${customClass}.product-list-spinner .rect4 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
      }
      .${customClass}.product-list-spinner .rect5 {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
      }
      @-webkit-keyframes sk-stretchdelay {
        0%,
        40%,
        100% {
          -webkit-transform: scaleY(0.4);
        }
        20% {
          -webkit-transform: scaleY(1);
        }
      }
      @keyframes sk-stretchdelay {
        0%,
        40%,
        100% {
          transform: scaleY(0.4);
          -webkit-transform: scaleY(0.4);
        }
        20% {
          transform: scaleY(1);
          -webkit-transform: scaleY(1);
        }
      }
    </style>`
);

export default ProductListLoading;
