// emulate URL anchor page scroll functionality
export function scrollToHashId() {
  // get URL hash (minus the hash mark)
  const hash = window.location.hash.substring(1)

  // if there's a hash, scroll to that ID
  if (hash && hash.length) {
    // setTimeout and requestAnimationFrame help ensure a true DOM repaint/reflow before we try to scroll
    // - reference: http://stackoverflow.com/a/34999925
    setTimeout(
      window.requestAnimationFrame(function () {
        const el = document.getElementById(hash)
        if (el) {
          el.scrollIntoView()
        }
      }),
      0
    )
  }
}
