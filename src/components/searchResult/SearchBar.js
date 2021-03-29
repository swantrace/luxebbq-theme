import { html, virtual } from '@apollo-elements/haunted';

const SearchBar = virtual(
  () => html`
    <div class="row search-bar-row">
      <div class="col-lg-10 offset-lg-1">
        <form class="form-header" action="/search" method="get" role="search">
          <div class="input-group">
            <input
              type="search"
              class="form-control"
              name="q"
              aria-label="Amount (to the nearest dollar)"
              placeholder="Type some keywords"
            />
            <div class="input-group-append">
              <button class="btn btn-solid">
                <span class="search-text">Search</span
                ><span class="search-icon">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   »</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `
);

export default SearchBar;
