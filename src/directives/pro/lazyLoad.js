export default {
  inserted(el, binding) {
    const selector = binding.value.selector || 'img'
    const offset = binding.value.offset || 0
    const loading = binding.value.loading || 'https://placehold.it/600x400?text=Loading'
    const error = binding.value.error || 'https://placehold.it/600x400?text=Error'
    const animation = binding.value.animation || 'fadeIn'
    const elementsToLoad = el.querySelectorAll(selector)

    if (selector === 'this') {

      if (el.nodeName === 'IMG') {
        el.src = loading
      } else if (el.nodeName === 'VIDEO') {
        el.poster = loading
      } else {
        return
      }
      el.onload = () => {
        el.lazyLoad()
      }

      let alreadyLoaded = false

      el.lazyLoad = () => {
        if (window.innerHeight - offset > el.getBoundingClientRect().top && !alreadyLoaded) {
          if (animation) {
            let classNames = el.getAttribute('class')
            classNames = `${classNames} animated ${animation}`
            el.setAttribute('class', classNames)
          }
          el.src = el.dataset.src
          el.onerror = () => {
            el.src = error
          }
          alreadyLoaded = true
        }
      }

    } else {

      elementsToLoad.forEach(item => {

        if (selector === 'img') {
          item.src = loading
        } else if (selector === 'video') {
          item.poster = loading
        } else {
          return
        }
        item.onload = () => {
          el.lazyLoad()
        }
      })

      let elementsToLoadArray = Array.from(elementsToLoad)

      el.lazyLoad = () => {
        elementsToLoadArray.forEach((item, key) => {
          if (window.innerHeight - offset > item.getBoundingClientRect().top) {
            if (animation) {
              let classNames = item.getAttribute('class')
              classNames = `${classNames} animated ${animation}`
              item.setAttribute('class', classNames)
            }
            item.src = item.dataset.src
            item.onerror = () => {
              item.src = error
            }
            elementsToLoadArray.splice(key, 1)
          }
        })
      }
    }

    window.addEventListener('scroll', el.lazyLoad);
  },
  unbind(el) {
    window.removeEventListener('scroll', el.lazyLoad);
  }
};
