import {
  component,
  html,
  useLayoutEffect,
  useState,
  useRef,
} from '@apollo-elements/haunted';

function DoubleSlider({
  wrapperClass = 'double-slider-wrapper',
  sliderWidth = 200,
  minRange = 50,
  maxRange = 200,
  outputWidth = 30,
  outputFontSize = '14px',
  outputColor = '#0a1a17',
  outputBgColor = ' #4ac4ac',
  thumbWidth = 18,
  thumbBorderWidth = 4,
  thumbBgColor = '#0f4534',
  trackHeight = 4,
  inactiveTrackBgColor = '#17694f',
  activeTrackBgColor = '#4ac4ac',
  minValue = 50,
  maxValue = 200,
  onValueChange = ([valueMin, valueMax]) => {
    console.log(valueMin, valueMax);
  },
} = {}) {
  const range = maxRange - minRange;
  const thumbRealWidth = thumbWidth + 2 * thumbBorderWidth;
  // add variable that need to do state management
  const containerRef = useRef();
  const sliderRef = useRef();
  const trackRef = useRef();
  const thumbsRef = useRef();
  const outputsRef = useRef();
  const sliderWidthRef = useRef();
  const rangeKRef = useRef();

  const [isDragging0, setIsDragging0] = useState(false);
  const [isDragging1, setIsDragging1] = useState(false);
  const [min, setMin] = useState(minValue);
  const [max, setMax] = useState(maxValue);

  const oMousePos = (elmt, evt) => {
    const ClientRect = elmt.getBoundingClientRect();
    return {
      // objeto
      x: Math.round(evt.clientX - ClientRect.left),
      y: Math.round(evt.clientY - ClientRect.top),
    };
  };

  const handleContainerMouseMoved = (evt) => {
    // I need to change this, this should be the container
    const mousePos = oMousePos(this, evt);
    const newMin = isDragging0
      ? Math.round(mousePos.x / rangeKRef.current) + minRange
      : min;
    const newMax = isDragging1
      ? Math.round(mousePos.x / rangeKRef.current) + minRange
      : max;
    setMin(newMin);
    setMax(newMax);
    onValueChange([newMin, newMax]);
  };
  // add constant that can be accessed at the beginning from props

  useLayoutEffect(() => {
    containerRef.current = this.querySelector(`.${wrapperClass}`);
    sliderRef.current = this.querySelector('.slider');
    const sliderRealWidth = sliderRef.current.offsetWidth;
    sliderWidthRef.current =
      sliderWidth > sliderRealWidth ? sliderRealWidth : sliderWidth;
    rangeKRef.current = sliderWidthRef.current / range;
    trackRef.current = this.querySelector('.track');
    thumbsRef.current = this.querySelectorAll('.thumb');
    outputsRef.current = this.querySelectorAll('.output');
    // styles
    sliderRef.current.style.height = `${trackHeight}px`;
    sliderRef.current.style.width = `${sliderWidth}px`;
    sliderRef.current.style.paddingLeft = `${
      (minValue - minRange) * rangeKRef.current
    }px`;
    sliderRef.current.style.paddingRight = `${
      sliderWidth - maxValue * rangeKRef.current
    }px`;

    trackRef.current.style.width = `${
      maxValue * rangeKRef.current - minValue * rangeKRef.current
    }px`;

    // todo: need to fix theValue[i]

    [0, 1].forEach((i) => {
      thumbsRef.current[i].style.height = `${thumbWidth}px`;
      thumbsRef.current[i].style.width = `${thumbWidth}px`;
      console.log(`${thumbWidth}px`);
      thumbsRef.current[i].style.borderWidth = `${thumbBorderWidth}px`;
      thumbsRef.current[i].style.top = `${-(
        thumbWidth / 2 +
        thumbBorderWidth -
        trackHeight / 2
      )}px`;
      if (i === 0) {
        thumbsRef.current[i].style.left = `${
          (min - minRange) * rangeKRef.current - thumbRealWidth / 2
        }px`;
      } else {
        thumbsRef.current[i].style.left = `${
          (max - minRange) * rangeKRef.current - thumbRealWidth / 2
        }px`;
      }

      console.log(thumbsRef.current[i]);
      outputsRef.current[i].style.left = `${outputWidth}px`;
      outputsRef.current[i].style.lineHeight = `${outputWidth}px`;
      outputsRef.current[i].style.height = `${outputWidth}px`;
      outputsRef.current[i].style.width = `${outputWidth}px`;
      outputsRef.current[i].style.top = `${-(
        Math.sqrt(2 * outputWidth * outputWidth) +
        thumbWidth / 2 -
        trackHeight / 2
      )}px`;
      if (i === 0) {
        outputsRef.current[i].style.left = `${
          (min - minRange) * rangeKRef.current - outputWidth / 2
        }px`;
      } else {
        outputsRef.current[i].style.left = `${
          (max - minRange) * rangeKRef.current - outputWidth / 2
        }px`;
      }
    });
  }, []);

  useLayoutEffect(() => {
    if (isDragging0) {
      if (min < max - thumbRealWidth / 2 && min >= minRange) {
        thumbsRef.current[0].style.left = `${
          (min - minRange) * rangeKRef.current - thumbRealWidth / 2
        }px`;
        outputsRef.current[0].style.left = `${
          (min - minRange) * rangeKRef.current - outputWidth / 2
        }px`;
        sliderRef.current.style.paddingLeft = `${
          (min - minRange) * rangeKRef.current
        }px`;
        trackRef.current.style.width = `${(max - min) * rangeKRef.current}px`;
      }
    } else if (isDragging1) {
      if (max > min + thumbRealWidth / 2 && max <= maxRange) {
        thumbsRef.current[1].style.left = `${
          (max - minRange) * rangeKRef.current - thumbRealWidth / 2
        }px`;
        outputsRef.current[1].style.left = `${
          (max - minRange) * rangeKRef.current - outputWidth / 2
        }px`;
        sliderRef.current.style.paddingRight = `${
          (maxRange - max) * rangeKRef.current
        }px`;
        trackRef.current.style.width = `${(max - min) * rangeKRef.current}px`;
      }
    }
  }, [isDragging0, isDragging1, min, max]);

  return html`<div
    class=${wrapperClass}
    @mouseup=${() => {
      setIsDragging0(false);
      setIsDragging0(false);
    }}
    @mouseout=${() => {
      setIsDragging1(false);
      setIsDragging1(false);
    }}
    @mousemove=${handleContainerMouseMoved}
  >
    <div class="slider">
      <div class="track"></div>
    </div>
    <div class="output o0"><p>${min}</p></div>
    <div class="thumb t0" @mousedown=${() => setIsDragging0(true)}></div>
    <div class="output o1"><p>${max}</p></div>
    <div class="thumb t1" @mousedown=${() => setIsDragging1(true)}></div>
    <style>
      .${wrapperClass} {
        position: relative;
        width: 100%;
      }
      .${wrapperClass} > .slider {
        pointer-events: none;
        margin: 0px;
        max-width: 100%;
        cursor: pointer;
        background-color: ${inactiveTrackBgColor};
        box-sizing: border-box;
        display: flex;
        align-items: center;
      }
      .${wrapperClass} > .slider.focusable {
        border: 1px solid #222;
      }
      .${wrapperClass} > .slider > .track {
        height: 100%;
        pointer-events: none;
        background-color: ${activeTrackBgColor};
      }
      .${wrapperClass} > .thumb {
        cursor: pointer;
        border-color: #333;
        border-style: solid;
        background-color: ${thumbBgColor};
        border-radius: 50%;
        position: absolute;
      }
      .${wrapperClass} > .output {
        pointer-events: none;
        margin: 0;
        border-radius: 50% 50% 0 50%;
        background-color: ${outputBgColor};
        text-align: center;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        position: absolute;
      }
      .${wrapperClass} > .output > p {
        pointer-events: none;
        font-size: ${outputFontSize};
        color: ${outputColor};
        text-align: center;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
    </style>
  </div>`;
}

customElements.define(
  'double-slider',
  component(DoubleSlider, {
    observedAttributes: ['wrapper-class', 'slider-width', ''],
    useShadowDOM: false,
  })
);
