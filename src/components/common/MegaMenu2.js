/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import { html } from '@apollo-elements/haunted';
import slugify from 'slugify';

function MegaMenu2({ parentMenu }) {
  const megaMenu = window?.dtmMegaMenu2?.[parentMenu] ?? [];
  const urlBase = `/collections/${slugify(parentMenu ?? 'general', {
    lower: true,
  })}?`;

  console.log('parentMenu: ', parentMenu, '\n');

  return html`${megaMenu.length > 1
    ? html`<li
        class="${slugify(parentMenu ?? 'general', { lower: true })}-submenu"
      >
        <div class="container">
          <div class="row" style="overflow: hidden;">
            ${megaMenu.map(
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
                                class=${menuItem?.class ? menuItem.class : ''}
                                href=${menuItem?.rules?.customLink
                                  ? menuItem.rules.customLink
                                  : `${urlBase}${Object.entries(menuItem.rules)
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
    : megaMenu.length === 1
    ? html`${megaMenu[0].map(
        (menuItem) => html`
          <li class="${menuItem.header ? 'is-header' : ''}">
            <a
              class=${menuItem?.class ? menuItem.class : ''}
              href=${menuItem?.rules?.customLink
                ? menuItem.rules.customLink
                : `${urlBase}${Object.entries(menuItem.rules)
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
  tagName: 'mega-menu-2',
  renderer: MegaMenu2,
  options: {
    observedAttributes: ['parent-menu', 'product-type', 'dropdown-type'],
    useShadowDOM: false,
    baseElement: HTMLUListElement,
  },
  elementOptions: { extends: 'ul' },
};
