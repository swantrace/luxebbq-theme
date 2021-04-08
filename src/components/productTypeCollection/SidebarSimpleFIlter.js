import { html, virtual } from '@apollo-elements/haunted';
import slugify from 'slugify';

const SidebarSimpleFilter = virtual(
  ({ state, filter, handleSelectedOptionsChanged }) => {
    const { fetchIsFinished, searchString } = state;
    const { info: options, title: filterTitle, stateKey } = filter;
    const selectedOptions = state[stateKey];
    return html` <div class="collection-collapse-block">
      <h3 class="collapse-block-title">${filterTitle}</h3>
      <div class="collection-collapse-block-content">
        <div class="collection-sidebar-filter mt-4">
          <ul
            class="sidebar_filter_cls"
            id=${slugify(filterTitle, { lower: true })}
          >
            ${options.map(
              (option) => html`
                <li>
                  <div
                    class="form-control custom-checkbox collection-filter-checkbox first-level"
                  >
                    <input
                      ?disabled=${!fetchIsFinished || searchString}
                      type="checkbox"
                      class="form-control-input"
                      id=${slugify(option, { lower: true })}
                      ?checked=${!!selectedOptions?.includes(option)}
                      @change=${(e) =>
                        handleSelectedOptionsChanged(option, filter, e)}
                    />
                    <label
                      class="form-control-label"
                      for=${slugify(option, { lower: true })}
                      >${option}</label
                    >
                  </div>
                </li>
              `
            )}
          </ul>
        </div>
      </div>
    </div>`;
  }
);

export default SidebarSimpleFilter;
