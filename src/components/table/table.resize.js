import {$} from '@core/dom';

export function resizeHandler(root, event) {
  event.target.classList.add('active')
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const type = $resizer.data.resize
  const coords = $parent.getCoords()
  const resizeCoords = $resizer.getCoords()
  let value

  document.onmousemove = (e) => {
    if (type === 'col') {
      const minWidth = parseInt(getComputedStyle($parent.$el).minWidth)
      value = e.pageX - coords.left
      if (value < minWidth) {
        value = minWidth
      }
      $resizer.css({left: value - resizeCoords.width + 'px'})
    } else {
      const minHeight = parseInt(getComputedStyle($parent.$el).minHeight)
      value = e.pageY - coords.top
      if (value < minHeight) {
        value = minHeight
      }
      $resizer.css({top: value - resizeCoords.height + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      $parent.css({width: value + 'px'})
      root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px')
    } else {
      $parent.css({height: value + 'px'})
    }

    $resizer.$el.classList.remove('active')
  }
}