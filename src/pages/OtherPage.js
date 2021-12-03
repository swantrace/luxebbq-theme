import { component } from '@apollo-elements/haunted';
import {
  CompareTable,
  MegaMenu,
  MegaMenu2,
  setupStart,
  LandingPageCollectionLink,
} from '../shared/index';

[CompareTable, MegaMenu, MegaMenu2, LandingPageCollectionLink].forEach(
  (pComponent) => {
    customElements.define(
      pComponent.tagName,
      component(pComponent.renderer, pComponent.options),
      pComponent?.elementOptions
    );
  }
);

setupStart();
