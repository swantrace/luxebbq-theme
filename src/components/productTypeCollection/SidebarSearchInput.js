import { html, virtual } from '@apollo-elements/haunted';

const SidebarSearchInput = virtual(
  ({ state, filter, handleSearchStringChanged }) => {
    console.log('state', state);
    const { searchString, fetchIsFinished } = state;
    return html`<input
      type="text"
      ?disabled=${!fetchIsFinished}
      class="form-control my-3"
      id="collection-search-input"
      placeholder="Search"
      value=${searchString}
      @keyup=${(e) => handleSearchStringChanged(filter, e)}
    />`;
  }
);

export default SidebarSearchInput;
