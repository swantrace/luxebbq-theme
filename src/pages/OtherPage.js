import { component } from '@apollo-elements/haunted';
import { CompareTable } from '../shared/index';

[CompareTable].forEach((pComponent) => {
  customElements.define(
    pComponent.tagName,
    component(pComponent.renderer, pComponent.options)
  );
});
