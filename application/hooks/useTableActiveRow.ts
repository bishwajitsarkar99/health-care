export function activeTableRow(element: HTMLElement) {
    element.classList.add("clicked")
  
    const siblings = element.parentElement?.children
    if (!siblings) return
  
    Array.from(siblings).forEach(el => {
      if (el !== element) {
        el.classList.remove("clicked")
      }
    })
}