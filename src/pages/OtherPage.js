import { component } from '@apollo-elements/haunted';
import {
  CompareTable,
  MegaMenu,
  setupStart,
  LandingPageCollectionLink,
} from '../shared/index';

[CompareTable, MegaMenu, LandingPageCollectionLink].forEach((pComponent) => {
  customElements.define(
    pComponent.tagName,
    component(pComponent.renderer, pComponent.options),
    pComponent?.elementOptions
  );
});

setupStart();
