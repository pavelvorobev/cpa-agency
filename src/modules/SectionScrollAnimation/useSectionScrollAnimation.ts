import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'

export interface UseSectionScrollAnimationOptions {
  /**
   * Длительность анимации перехода между секциями (секунды).
   * @default 0.8
   */
  duration?: number
  /**
   * Easing анимации.
   * @default 'power2.inOut'
   */
  ease?: string
  /**
   * Задержка после завершения анимации перед разблокировкой скролла (мс).
   * Защищает от инерции тачпада.
   * @default 250
   */
  cooldownMs?: number
}

const DEFAULT_OPTIONS: Required<UseSectionScrollAnimationOptions> = {
  duration: 0.8,
  ease: 'power2.inOut',
  cooldownMs: 250,
}

/**
 * Посекционный скролл на GSAP Observer.
 *
 * Ожидаемая структура:
 * - rootRef: корень страницы (overflow: hidden, height: 100dvh)
 * - trackRef: трек со всеми секциями внутри root
 * - секции внутри track отмечены атрибутом [data-scroll-section]
 *
 * Каждая секция должна занимать ровно 100dvh.
 * Переход выполняется на window.innerHeight пикселей (один viewport = одна секция).
 */
export function useSectionScrollAnimation(
  rootRef: Ref<HTMLElement | null | undefined>,
  trackRef: Ref<HTMLElement | null | undefined>,
  options: UseSectionScrollAnimationOptions = {},
) {
  let observer: Observer | null = null
  let unlockTimer: ReturnType<typeof setTimeout> | null = null
  let restoreScrollLock: (() => void) | null = null
  let currentTween: gsap.core.Tween | null = null

  onMounted(() => {
    if (typeof window === 'undefined') {
      return
    }

    const root = rootRef.value
    const track = trackRef.value

    if (!root || !track) {
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const { duration, ease, cooldownMs } = { ...DEFAULT_OPTIONS, ...options }

    const sections = Array.from(track.querySelectorAll<HTMLElement>('[data-scroll-section]'))
    if (sections.length < 2) {
      return
    }

    gsap.registerPlugin(Observer)

    // Заблокировать нативный скролл страницы
    const html = document.documentElement
    const body = document.body
    const prevHtmlOverscroll = html.style.overscrollBehavior
    const prevBodyOverflow = body.style.overflow
    const prevBodyOverscroll = body.style.overscrollBehavior

    html.style.overscrollBehavior = 'none'
    body.style.overflow = 'hidden'
    body.style.overscrollBehavior = 'none'

    restoreScrollLock = () => {
      html.style.overscrollBehavior = prevHtmlOverscroll
      body.style.overflow = prevBodyOverflow
      body.style.overscrollBehavior = prevBodyOverscroll
    }

    // Установить начальное состояние явно
    gsap.set(track, { y: 0 })

    let activeIndex = 0
    let isLocked = false

    const unlock = () => {
      if (unlockTimer !== null) {
        clearTimeout(unlockTimer)
        unlockTimer = null
      }
      unlockTimer = setTimeout(() => {
        isLocked = false
        unlockTimer = null
      }, cooldownMs)
    }

    const goToSection = (nextIndex: number) => {
      if (isLocked) {
        return
      }

      const target = gsap.utils.clamp(0, sections.length - 1, nextIndex)
      if (target === activeIndex) {
        return
      }

      isLocked = true

      // ВАЖНО: сдвигаем трек на window.innerHeight пикселей (= 100dvh),
      // а не на yPercent, который считается от высоты самого трека.
      currentTween?.kill()
      currentTween = gsap.to(track, {
        y: -window.innerHeight * target,
        duration,
        ease,
        overwrite: true,
        onComplete: () => {
          activeIndex = target
          currentTween = null
          unlock()
        },
      })
    }

    // Пересчитать y при ресайзе, чтобы трек не "уехал"
    const onResize = () => {
      gsap.set(track, { y: -window.innerHeight * activeIndex })
    }
    window.addEventListener('resize', onResize)

    observer = Observer.create({
      target: window,
      type: 'wheel,touch',
      preventDefault: true,
      tolerance: 10,
      onDown: () => goToSection(activeIndex + 1),
      onUp: () => goToSection(activeIndex - 1),
    })

    // Сохранить cleanup ресайза вместе со scroll lock
    const origRestore = restoreScrollLock
    restoreScrollLock = () => {
      origRestore()
      window.removeEventListener('resize', onResize)
    }
  })

  onBeforeUnmount(() => {
    if (unlockTimer !== null) {
      clearTimeout(unlockTimer)
      unlockTimer = null
    }

    currentTween?.kill()
    currentTween = null

    observer?.kill()
    observer = null

    restoreScrollLock?.()
    restoreScrollLock = null
  })
}
