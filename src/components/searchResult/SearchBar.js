import { html, useState, virtual } from '@apollo-elements/haunted';

const SearchBar = virtual(() => {
  const params = new URLSearchParams(window.location.search);
  const searchTermFromUrl = decodeURI(params.get('q') ?? '');
  const [searchTerm, setSearchTerm] = useState(searchTermFromUrl);
  const handleSearchTermChanged = (e) => {
    setSearchTerm(e.target.value);
  };
  return html`
    <div class="row search-bar-row">
      <div class="col-lg-10 offset-lg-1">
        <form class="form-header" action="/search" method="get" role="search">
          <div class="input-group">
            <input
              type="search"
              class="form-control"
              name="q"
              value=${searchTerm}
              onChange=${handleSearchTermChanged}
              aria-label="Amount (to the nearest dollar)"
              placeholder="Type some keywords"
            />
            <div class="input-group-append">
              <button class="btn btn-solid">
                <span class="search-text">Search</span
                ><span class="search-icon"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; »</span
                >
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;
});

export default SearchBar;
