import { html } from '@apollo-elements/haunted';
import { usePageContext } from '../../context';
import SidebarCheckbox from './SidebarCheckbox';
import SidebarNestedFilter from './SidebarNestedFilter';
import SidebarRangeSlider from './SidebarRangeSlider';
import SidebarSearchInput from './SidebarSearchInput';
import SidebarSimpleFilter from './SidebarSimpleFIlter';
import SidebarTopImages from './SidebarTopImages';

function ProductTypeSidebar() {
  const {
    state,
    dispatch,
    arrayOfFilters,
    collectionImages,
  } = usePageContext();
  // console.log('state', state);
  const handleSearchStringChanged = (filter, e) => {
    dispatch({
      type: filter.actionType,
      payload: e.target.value,
    });
  };
  const handleSelectedOptionsChanged = (option, filter, e) => {
    const input = e.target;
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
  const handleValueUpdated = (filter, e) => {
    dispatch({
      type: filter.actionType,
      payload: [e.target.valueMin, e.target.valueMax],
    });
  };
  const handleCheckboxInputChanged = (filter, e) => {
    dispatch({
      type: filter.actionType,
      payload: e.target.checked,
    });
  };
  return html`<div class="coll_sidebar">
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
    <div class="collection-filter-block custom_filter mt-4">
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
