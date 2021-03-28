import {
  createContext,
  html,
  useContext,
  virtual,
} from '@apollo-elements/haunted';

const context = createContext();
customElements.define('context-provider', context.Provider);
export const pageWrapper = virtual(({ children, ...rest }) => {
  const sharedState = {};
  return html`<context-provider .value=${{ ...rest, ...sharedState }}
    >${html`${children}`}</context-provider
  >`;
});
export const usePageContext = () => useContext(context);
