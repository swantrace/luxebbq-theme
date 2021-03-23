import {
  createContext,
  html,
  useContext,
  virtual,
} from '@apollo-elements/haunted';

const barbequeSmokerCollectionContext = createContext();

customElements.define(
  'barbeque-smoker-collection-provider',
  barbequeSmokerCollectionContext.Provider
);
export const BarbequeSmokerCollectionWrapper = virtual(
  ({ children, ...rest }) => {
    const sharedState = {};
    return html`<barbeque-smoker-collection-provider
      .value=${{ ...rest, ...sharedState }}
    >
      ${html`${children}`}
    </barbeque-smoker-collection-provider>`;
  }
);

export const useBarbequeSmokerCollectionContext = () =>
  useContext(barbequeSmokerCollectionContext);

export default {
  useBarbequeSmokerCollectionContext,
  BarbequeSmokerCollectionWrapper,
};
