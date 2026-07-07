// v-tilt — subtle 3D card tilt following the cursor.
// Optional value sets max degrees (default 7).
export default {
  mounted(el, binding) {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const max = typeof binding.value === 'number' ? binding.value : 7

    const move = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el.style.transition = 'transform 0.1s ease-out'
      el.style.transform = `perspective(800px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`
    }
    const leave = () => {
      el.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
      el.style.transform = 'perspective(800px)'
    }

    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    el._tilt = { move, leave }
    el.style.willChange = 'transform'
  },
  unmounted(el) {
    if (!el._tilt) return
    el.removeEventListener('mousemove', el._tilt.move)
    el.removeEventListener('mouseleave', el._tilt.leave)
    delete el._tilt
  },
}
