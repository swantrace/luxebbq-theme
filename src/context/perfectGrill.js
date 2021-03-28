import {
  createContext,
  html,
  useContext,
  virtual,
} from '@apollo-elements/haunted';

const perfectGrillContext = createContext();

customElements.define('perfect-grill-provider', perfectGrillContext.Provider);
export const perfectGrillWrapper = virtual(({ children, ...rest }) => {
  const sharedState = {};
  return html`<perfect-grill-provider .value=${{ ...rest, ...sharedState }}>
    ${html`${children}`}
  </perfect-grill-provider>`;
});

export const usePerfectGrillContext = () => useContext(perfectGrillContext);

export default {
  usePerfectGrillContext,
  perfectGrillWrapper,
};
