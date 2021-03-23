import { html } from '@apollo-elements/haunted';
import SearchBar from '../components/common/SearchBar';
import TitleBanner from '../components/common/TitleBanner';
import { SearchResultWrapper } from '../context/searchResult';

function SearchResult() {
  const params = new URLSearchParams(window.location.search);
  const searchString = decodeURI(params.get('q') ?? '');

  return html`${SearchResultWrapper({
    children: html` <section class="authentication-page section-b-space">
      <div class="container">
        <section class="p-0">
          <div class="container">
            ${SearchBar({ searchString })}
            <div class="row search-title-banner-row">
              <div class="col-lg-10 offset-lg-1">
                ${TitleBanner({ title: 'SEARCH RESULTS' })}
              </div>
            </div>
            <search-product-list></search-product-list>
          </div>
        </section>
      </div>
    </section>`,
  })}`;
}

export default {
  tagName: 'search-result',
  renderer: SearchResult,
  options: {
    observedAttributes: ['search-term'],
    useShadowDOM: false,
  },
};
