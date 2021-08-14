import { html, useEffect, useState, virtual } from '@apollo-elements/haunted';
import slugify from 'slugify';

const SidebarSimpleFilter = virtual(
  ({ state, filter, handleSelectedOptionsChanged }) => {
    const [viewAll, setViewAll] = useState(true);
    const { fetchIsFinished, searchString } = state;
    const {
      info: options,
      title: filterTitle,
      stateKey,
      hide: hideOptions,
    } = filter;
    const selectedOptions = state[stateKey];

    // console.log('filter: ', filter);

    useEffect(() => {
      if (!hideOptions || hideOptions.length === 0) {
        setViewAll(false);
      }
    }, [hideOptions]);

    const handleViewAllButtonClicked = () => {
      setViewAll((previousViewAll) => !previousViewAll);
    };

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
                <li
                  id=${`${slugify(option, { lower: true })}-list-item`}
                  class=${hideOptions?.includes?.(option) && viewAll
                    ? 'd-none'
                    : ''}
                >
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
          ${hideOptions && hideOptions.length && hideOptions.length > 0
            ? html`<button @click=${handleViewAllButtonClicked} class="btn">
                ${viewAll ? 'View All' : 'View Less'}
              </button>`
            : null}
        </div>
      </div>
    </div>`;
  }
);

export default SidebarSimpleFilter;
