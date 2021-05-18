import { component } from '@apollo-elements/haunted';
import { CompareTable, MegaMenu, setupStart } from '../shared/index';

[CompareTable, MegaMenu].forEach((pComponent) => {
  customElements.define(
    pComponent.tagName,
    component(pComponent.renderer, pComponent.options),
    pComponent?.elementOptions
  );
});

setupStart();
