import {
  createContext,
  html,
  useContext,
  virtual,
} from '@apollo-elements/haunted';

const searchResultContext = createContext();

customElements.define('search-result-provider', searchResultContext.Provider);
export const SearchResultWrapper = virtual(({ children, ...rest }) => {
  const sharedState = {};
  return html`<search-result-provider .value=${{ ...rest, ...sharedState }}>
    ${html`${children}`}
  </search-result-provider>`;
});

export const useSearchResultContext = () => useContext(searchResultContext);

export default {
  useSearchResultContext,
  SearchResultWrapper,
};
