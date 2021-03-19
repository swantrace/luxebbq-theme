import {
  createContext,
  html,
  useContext,
  virtual,
} from '@apollo-elements/haunted';

const BarbequeSmokerCollectionContext = createContext();

customElements.define(
  'barbeque-smoker-collection-provider',
  BarbequeSmokerCollectionContext.Provider
);
export const BarbequeSmokerCollectionWrapper = virtual(
  ({ children, ...rest }) => {
    console.log(children, rest);
    const sharedState = {};
    return html`<barbeque-smoker-collection-provider
      .value=${{ ...rest, ...sharedState }}
    >
      ${html`${children}`}
    </barbeque-smoker-collection-provider>`;
  }
);

export const useBarbequeSmokerCollectionContext = () =>
  useContext(BarbequeSmokerCollectionContext);

export default {
  useBarbequeSmokerCollectionContext,
  BarbequeSmokerCollectionWrapper,
};
