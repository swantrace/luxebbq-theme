import { html, useCallback } from '@apollo-elements/haunted';
import debounce from 'lodash.debounce';
import { usePageContext } from '../../shared/context';
import SidebarCheckbox from './SidebarCheckbox';
import SidebarNestedFilter from './SidebarNestedFilter';
import SidebarRangeSlider from './SidebarRangeSlider';
import SidebarSearchInput from './SidebarSearchInput';
import SidebarSimpleFilter from './SidebarSimpleFIlter';
import SidebarTopImages from './SidebarTopImages';
import SidebarRangeSliderWithCheckbox from './SidebarRangeSliderWithCheckbox';

function ProductTypeSidebar() {
  const {
    state,
    dispatch,
    arrayOfFilters,
    collectionImages,
  } = usePageContext();
  // console.log('state', state);
  const { fetchIsFinished, searchString } = state;
  const handleSearchStringChanged = useCallback(
    debounce((filter, e) => {
      const payload = e.target.value;
      dispatch({
        type: filter.actionType,
        payload,
      });
    }, 300),
    []
  );
  const handleSelectedOptionsChanged = (option, filter, e) => {
    const input = e.target;
    // console.log('input: ', input);
    if (input.checked) {
      dispatch({
        type: filter.actionType,
        payload: [...state[filter.stateKey], option],
      });
    } else {
      dispatch({
        type: filter.actionType,
        payload: state[filter.stateKey].filter((o) => o !== option),
      });
    }
  };
  const handleFirstLevelSelectedOptionsChanged = (
    firstLevelOption,
    filter,
    e
  ) => {
    const firstLevelInput = e.target;
    if (firstLevelInput.checked) {
      dispatch({
        type: filter.actionType,
        payload: [...state[filter.stateKey], [firstLevelOption, []]],
      });
    } else {
      dispatch({
        type: filter.actionType,
        payload: state[filter.stateKey].filter(
          ([fOption]) => fOption !== firstLevelOption
        ),
      });
      const secondLevelInputs = firstLevelInput.parentNode.querySelectorAll(
        'ul li input'
      );
      // console.log('secondLevelInputs', secondLevelInputs);
      secondLevelInputs.forEach((input) => {
        // eslint-disable-next-line no-param-reassign
        input.checked = false;
      });
    }
  };
  const handleSecondLevelSelectedOptionsChanged = (
    firstLevelOption,
    secondLevelOption,
    filter,
    e
  ) => {
    // console.log(firstLevelOption, secondLevelOption, filter, e);
    const secondLevelInput = e.target;
    if (secondLevelInput.checked) {
      dispatch({
        type: filter.actionType,
        payload: state[filter.stateKey].map(([fOption, sOptions]) => {
          if (fOption === firstLevelOption) {
            return [fOption, [...sOptions, secondLevelOption]];
          }
          return [fOption, sOptions];
        }),
      });
    } else {
      dispatch({
        type: filter.actionType,
        payload: state[filter.stateKey].map(([fOption, sOptions]) => {
          if (fOption === firstLevelOption) {
            return [
              fOption,
              sOptions.filter((sOption) => sOption !== secondLevelOption),
            ];
          }
          return [fOption, sOptions];
        }),
      });
    }
  };
  const handleValueUpdated = useCallback(
    debounce((filter, e) => {
      dispatch({
        type: filter.actionType,
        payload: [e.target.valueMin, e.target.valueMax],
      });
    }, 300),
    []
  );

  const handleRangeSliderWithCheckboxValueUpdated = useCallback(
    debounce((filter, valueMin, valueMax, overMaxChecked) => {
      dispatch({
        type: filter.actionType,
        payload: [valueMin, valueMax, overMaxChecked],
      });
    }, 50),
    []
  );

  const handleCheckboxInputChanged = (filter, e) => {
    dispatch({
      type: filter.actionType,
      payload: e.target.checked,
    });
  };
  return html`<div class="coll_sidebar px-2 px-lg-0">
    <div class="collection-mobile-back">
      <span class="filter-back">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
        <span data-trans-key="layout.navigation.back">back</span>
      </span>
    </div>
    ${SidebarTopImages({ collectionImages })}
    ${arrayOfFilters.find((filter) => filter.type === 'SearchInput')
      ? html`
          ${SidebarSearchInput({
            state,
            filter: arrayOfFilters.find(
              (filter) => filter.type === 'SearchInput'
            ),
            handleSearchStringChanged,
          })}
        `
      : null}
    <div
      class=${`collection-filter-block custom_filter mt-4${
        !fetchIsFinished || searchString ? ' should-be-disabled' : ''
      }`}
    >
      ${arrayOfFilters.map((filter) => {
        switch (filter.type) {
          case 'SimpleFilter': {
            return html`${SidebarSimpleFilter({
              state,
              filter,
              handleSelectedOptionsChanged,
            })}`;
          }
          case 'Checkbox': {
            return html`${SidebarCheckbox({
              state,
              filter,
              handleCheckboxInputChanged,
            })}`;
          }
          case 'NestedFilter': {
            return html`${SidebarNestedFilter({
              state,
              filter,
              handleFirstLevelSelectedOptionsChanged,
              handleSecondLevelSelectedOptionsChanged,
            })}`;
          }
          case 'RangeSlider': {
            return html`${SidebarRangeSlider({
              state,
              filter,
              handleValueUpdated,
            })}`;
          }
          case 'RangeSliderWithCheckbox': {
            return html`${SidebarRangeSliderWithCheckbox({
              state,
              filter,
              handleRangeSliderWithCheckboxValueUpdated,
            })}`;
          }
          default: {
            return null;
          }
        }
      })}
    </div>
  </div>`;
}

export default {
  tagName: 'product-type-sidebar',
  renderer: ProductTypeSidebar,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};

// <div class="collection-filter col-sm-3">
//     <div class="coll_sidebar">
//       <collection-sidebar-top-images></collection-sidebar-top-images>
//       <collection-sidebar-search-input></collection-sidebar-search-input>
//       ${FilterForTheProductType()}
//     </div>
//   </div>
