import { html, virtual } from '@apollo-elements/haunted';
import slugify from 'slugify';

const SidebarCheckbox = virtual(
  ({ state, filter, handleCheckboxInputChanged }) => {
    const { fetchIsFinished, searchString } = state;
    const { title: filterTitle, stateKey } = filter;
    const checked = state[stateKey];
    return html` <div class="collection-collapse-block">
      <div class="collection-collapse-block-content">
        <h3 class="collapse-block-title">${filterTitle}</h3>
        <div class="collection-sidebar-filter mt-4">
          <div
            class="form-control custom-checkbox collection-filter-checkbox first-level"
          >
            <input
              type="checkbox"
              @change=${(e) => handleCheckboxInputChanged(filter, e)}
              id=${slugify(stateKey, { lower: true })}
              ?checked=${checked}
              ?disabled=${!fetchIsFinished || searchString}
              class="form-control-input"
            />
            <label
              class="form-control-label"
              for=${slugify(stateKey, { lower: true })}
              >${filterTitle}</label
            >
          </div>
        </div>
      </div>
    </div>`;
  }
);

export default SidebarCheckbox;
