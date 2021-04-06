import { html, virtual } from '@apollo-elements/haunted';
import slugify from 'slugify';

const SidebarNestedFilter = virtual(
  ({
    state,
    filter,
    handleFirstLevelSelectedOptionsChanged,
    handleSecondLevelSelectedOptionsChanged,
  }) => {
    const { fetchIsFinished, searchString } = state;
    const { title: filterTitle, info: options, stateKey } = filter;
    const selectedOptions = state[stateKey];
    return html` <div
      class=${`collection-collapse-block ${filter.stateKey}-nested-filter`}
    >
      <h3 class="collapse-block-title">${filterTitle}</h3>
      <div class="collection-collapse-block-content">
        <div class="collection-sidebar-filter mt-4">
          <ul class="sidebar_filter_cls first_level_options">
            ${options.map(
              ([firstLevelOption, secondLevelOptions]) => html`
                <li>
                  <div
                    class="form-control custom-checkbox collection-filter-checkbox first-level"
                  >
                    <input
                      ?disabled=${!fetchIsFinished || searchString}
                      type="checkbox"
                      class="form-control-input"
                      id=${slugify(firstLevelOption, { lower: true })}
                      ?checked=${!!selectedOptions?.find(
                        ([foption]) => foption === firstLevelOption
                      )}
                      @change=${(e) =>
                        handleFirstLevelSelectedOptionsChanged(
                          firstLevelOption,
                          filter,
                          e
                        )}
                    />
                    <label
                      class="form-control-label"
                      for=${slugify(firstLevelOption, { lower: true })}
                      >${firstLevelOption}</label
                    >
                    <ul
                      class="sidebar_filter_cls second_level_options${selectedOptions?.find(
                        ([foption]) => foption === firstLevelOption
                      )
                        ? ''
                        : ' hidden'}"
                    >
                      ${secondLevelOptions.map((secondLevelOption) => {
                        const inputId = `${slugify(firstLevelOption, {
                          lower: true,
                        })}-${slugify(secondLevelOption, { lower: true })}`;
                        return html`
                          <li>
                            <div
                              class="form-control custom-checkbox collection-filter-checkbox ml-3"
                            >
                              <input
                                ?disabled=${!fetchIsFinished}
                                type="checkbox"
                                class="custom-checkbox collection-filter-checkbox"
                                id=${inputId}
                                ?checked=${!!selectedOptions
                                  .find(
                                    ([foption]) => foption === firstLevelOption
                                  )?.[1]
                                  ?.includes(secondLevelOption)}
                                @change=${(e) =>
                                  handleSecondLevelSelectedOptionsChanged(
                                    firstLevelOption,
                                    secondLevelOption,
                                    filter,
                                    e
                                  )}
                              />
                              <label class="form-control-label" for=${inputId}
                                >${secondLevelOption}</label
                              >
                            </div>
                          </li>
                        `;
                      })}
                    </ul>
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

export default SidebarNestedFilter;
