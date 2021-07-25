/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import { html } from '@apollo-elements/haunted';
import slugify from 'slugify';

function MegaMenu({ productType }) {
  const megaMenuForProductType = window?.dtmMegaMenu?.[productType] ?? [];
  const urlBase = `/collections/${slugify(productType ?? 'general', {
    lower: true,
  })}?`;
  return html`${megaMenuForProductType.length > 1
    ? html`<li
        class="${slugify(productType ?? 'general', { lower: true })}-submenu"
      >
        <div class="container">
          <div class="row" style="overflow: hidden;">
            ${megaMenuForProductType.map(
              (megaMenuCol) =>
                html` <div class="col">
                  <div class="link-section">
                    <div class="menu-content">
                      <ul>
                        ${megaMenuCol.map(
                          (menuItem) =>
                            html`<li
                              class="${menuItem.header ? 'is-header' : ''}"
                            >
                              <a
                                href=${`${urlBase}${Object.entries(
                                  menuItem.rules
                                )
                                  .map(
                                    ([ruleKey, ruleValue]) =>
                                      `${ruleKey}=${encodeURIComponent(
                                        JSON.stringify(ruleValue)
                                      )}`
                                  )
                                  .join('&')}`}
                                >${menuItem.label}</a
                              >
                            </li>`
                        )}
                      </ul>
                    </div>
                  </div>
                </div>`
            )}
          </div>
        </div>
      </li>`
    : megaMenuForProductType.length === 1
    ? html`${megaMenuForProductType[0].map(
        (menuItem) => html`
          <li class="${menuItem.header ? 'is-header' : ''}">
            <a
              href=${`${urlBase}${Object.entries(menuItem.rules)
                .map(
                  ([ruleKey, ruleValue]) =>
                    `${ruleKey}=${encodeURIComponent(
                      JSON.stringify(ruleValue)
                    )}`
                )
                .join('&')}`}
              >${menuItem.label}</a
            >
          </li>
        `
      )}`
    : null}`;
}

export default {
  tagName: 'mega-menu',
  renderer: MegaMenu,
  options: {
    observedAttributes: ['product-type'],
    useShadowDOM: false,
    baseElement: HTMLUListElement,
  },
  elementOptions: { extends: 'ul' },
};
