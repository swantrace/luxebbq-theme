/* eslint-disable no-nested-ternary */
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { html, useEffect, virtual } from '@apollo-elements/haunted';
import TitleBanner from '../common/TitleBanner';
import { createFragmentFromString } from '../../shared/helpers';

const Specifications = virtual(({ specificationList, description }) => {
  const regexp = /<iframe\s+[^>]+><\/iframe>/g;
  const videoRegexp = /<video\s*[^>]*>(.|\n)*<\/video>/g;
  const iframeHTMLString = description.match(regexp)?.[0] ?? '';
  const videoHTMLString = description.match(videoRegexp)?.[0] ?? '';
  const cleanedDescription = description
    .replace(iframeHTMLString, '')
    .replace(videoHTMLString, '');

  console.log(
    specificationList,
    description,
    '\n',
    'videoHTMLString',
    videoHTMLString
  );
  useEffect(() => {
    const videoWrapper = document.querySelector('#video-wrapper');
    if (iframeHTMLString !== '') {
      const iframeFragment = createFragmentFromString(iframeHTMLString);
      const iframeSrc = iframeFragment?.firstElementChild?.getAttribute('src');
      if (videoWrapper && iframeSrc && !videoWrapper.firstElementChild) {
        videoWrapper.appendChild(
          createFragmentFromString(
            `<iframe class="embed-responsive-item" src="${iframeSrc}" allowfullscreen></iframe>`
          )
        );
      }
    } else if (videoHTMLString !== '') {
      const videoFragment = createFragmentFromString(videoHTMLString);
      if (videoWrapper && !videoWrapper.firstElementChild) {
        videoWrapper.appendChild(videoFragment);
      }
    } else {
      videoWrapper.remove();
    }
  }, []);

  console.log('specification list: ', specificationList);
  return html`<div class="container">
    <div class="row mb-5">
      <div class="col">${TitleBanner({ title: 'SPECIFICATIONS' })}</div>
    </div>
    <div class="row mb-5">
      <div class="col-12 col-md-6">
        <table class="table border-0">
          <tbody>
            ${Object.entries(specificationList)
              .slice(0, Object.keys(specificationList).length / 2 + 1)
              .map(
                ([key, value]) =>
                  html`<tr>
                    <th scope="row" width="30%" class="text-white">
                      ${key === 'Cook Type'
                        ? 'Grill Type'
                        : key === 'Grill Type'
                        ? 'Grill Plates'
                        : key}
                    </th>
                    <td width="70%">
                      ${Array.isArray(value)
                        ? value.map(
                            (line, idx) =>
                              html`${idx < value.length - 1
                                ? html`${line}<br />`
                                : line}`
                          )
                        : value === true
                        ? 'Yes'
                        : value}
                    </td>
                  </tr>`
              )}
          </tbody>
        </table>
      </div>
      <div class="col-12 col-md-6">
        <table class="table border-0">
          <tbody>
            ${Object.entries(specificationList)
              .slice(Object.keys(specificationList).length / 2 + 1)
              .map(
                ([key, value]) =>
                  html`<tr>
                    <th scope="row" width="30%" class="text-white">
                      ${key === 'Cook Type'
                        ? 'Grill Type'
                        : key === 'Grill Type'
                        ? 'Grill Plates'
                        : key}
                    </th>
                    <td width="70%">
                      ${Array.isArray(value)
                        ? value.map(
                            (line, idx) =>
                              html`${idx < value.length - 1
                                ? html`${line}<br />`
                                : line}`
                          )
                        : value === true
                        ? 'Yes'
                        : value}
                    </td>
                  </tr>`
              )}
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col">${unsafeHTML(cleanedDescription)}</div>
    </div>
  </div>`;
});

export default Specifications;
