const applyFormat = (data, mask) => {
  if(!mask) return data;

  const maskStartRegExp = /^([^♠♣♥♦]+)/;

  if (data.length == 1 && maskStartRegExp.test(mask)) {
    data = maskStartRegExp.exec(mask)[0] + data;
  }

  let text = '';
  for (let i = 0, x = 1; x && i < mask.length; ++i) {
    let c = data.charAt(i);
    let m = mask.charAt(i);

    switch (m) {
      case '♠' : if (/\d/.test(c))        {text += c;} else {x = 0;} break;
      case '♣' : if ((/[a-zżźąćśńółę]/i).test(c))    {text += c;} else {x = 0;} break;
      case '♥' : if (/[a-zżźąćśńółę0-9]/i.test(c)) {text += c;} else {x = 0;} break;
      case '♦' : text += c; break;
      default  :
        text += m;

        if (c && c !== m) {
          data = ' ' + data;
        }

        break;
    }
  }
  return text;
}

const trigger = (el, type) =>  {
  const e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e)
}

const updateValue = (el, force = false) => {
  let {value, dataset: {previousValue, mask } } = el;

  if(previousValue.length && force || (value && value !== previousValue && value.length > previousValue.length)) {
    el.value = applyFormat(value, mask);
    trigger(el, 'input')
  }

  el.dataset.previousValue = value;
}

const updateMask = (el, mask) => {
  el.dataset.previousValue = el.value;
  el.dataset.mask = mask;
}

export default {
  bind(el, {value}) {
    if (el.nodeName !== 'INPUT') el = el.querySelector('input');

    updateMask(el, value);
    updateValue(el);
  },
  componentUpdated(el, {value, oldValue}){
    if (el.nodeName !== 'INPUT') el = el.querySelector('input');

    let isMaskChanged = value !== oldValue;
    if(isMaskChanged){
      updateMask(el, value);
    }
    updateValue(el, isMaskChanged);
  }

};
