// v-magnetic — element leans toward the cursor while hovered.
// Optional value sets strength (default 0.25).
export default {
  mounted(el, binding) {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const strength = typeof binding.value === 'number' ? binding.value : 0.25

    const move = (e) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      el.style.transition = 'transform 0.12s ease-out'
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
    }
    const leave = () => {
      el.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
      el.style.transform = ''
    }

    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    el._magnetic = { move, leave }
    el.style.display = getComputedStyle(el).display === 'inline' ? 'inline-block' : ''
    el.style.willChange = 'transform'
  },
  unmounted(el) {
    if (!el._magnetic) return
    el.removeEventListener('mousemove', el._magnetic.move)
    el.removeEventListener('mouseleave', el._magnetic.leave)
    delete el._magnetic
  },
}
