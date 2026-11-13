// Vue directive for scroll-triggered reveal animations using IntersectionObserver.
// Usage: <div v-reveal> or <div v-reveal="{ delay: 150 }">

const observer = typeof IntersectionObserver !== 'undefined'
  ? new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
  : null

export const reveal = {
  mounted(el, binding) {
    el.classList.add('reveal')
    const delay = binding.value?.delay
    if (delay) {
      el.style.transitionDelay = `${delay}ms`
    }
    if (observer) {
      observer.observe(el)
    } else {
      el.classList.add('is-visible')
    }
  },
  unmounted(el) {
    if (observer) observer.unobserve(el)
  },
}
