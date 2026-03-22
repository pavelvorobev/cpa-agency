<script setup lang="ts">
import { useRouter } from 'vue-router'

import snakeSrc from '@/app/assets/images/landing/404.png'
import { CubicButton } from '@/common/ui'
import { ROUTES } from '@/common/constants/routes'

defineOptions({
  name: 'NotFoundPage',
})

const router = useRouter()

function goHome() {
  void router.push(ROUTES.HOME)
}
</script>

<template>
  <div class="not-found">
    <div class="not-found__layout">
      <main class="not-found__main">
        <h1 class="not-found__code">
          <span class="not-found__digit">4</span>
          <span class="not-found__digit">0</span>
          <span class="not-found__digit">4</span>
        </h1>
        <CubicButton class="not-found__cta" type="button" @click="goHome">
          Take me back
        </CubicButton>
      </main>

      <img
        class="not-found__snake"
        :src="snakeSrc"
        alt=""
        width="541"
        height="494"
        decoding="async"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  position: relative;
  box-sizing: border-box;
  display: flex;
  min-height: 100dvh;
  height: 100dvh;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  color: $color-white;
}

.not-found__layout {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  min-height: 0;
}

.not-found__main {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: #{fs(24)};
  text-align: center;
}

.not-found__code {
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  font-size: #{fs(370)};
  font-weight: $font-weight-bold;
  line-height: 0.85;
  color: $color-white;
  letter-spacing: tracking-in-px(-8, 370);
}

.not-found__digit {
  display: inline-block;
}

.not-found__cta {
  margin-top: #{fs(40)};
}

.not-found__snake {
  pointer-events: none;
  position: absolute;
  bottom: #{fs(-60)};
  left: #{fs(-20)};
  z-index: 0;
  box-sizing: border-box;
  width: #{fs(541)};
  height: #{fs(494.21)};
  max-width: none;
  object-fit: contain;
  user-select: none;
}

@media (max-width: 900px) {
  .not-found {
    padding-bottom: max(#{fs(8)}, env(safe-area-inset-bottom, 0px));
  }

  .not-found__layout {
    justify-content: center;
  }

  .not-found__main {
    flex: 1;
    min-height: 0;
    justify-content: center;
    /* место под змею (~30–35% высоты экрана), она absolute внизу */
    padding: #{fs(32)} #{fs(20)} calc(36dvh + env(safe-area-inset-bottom, 0px));
  }

  .not-found__code {
    flex-direction: column;
    align-items: center;
    font-size: 180px;
    line-height: 0.78;
    letter-spacing: tracking-in-px(-4, 180);
  }

  .not-found__digit {
    display: block;
  }

  .not-found__cta {
    margin-top: #{fs(32)};
  }

  /* макет кнопки: высота 60, текст 18 bold, letter-spacing 20% */
  :deep(.not-found__cta) {
    min-height: 60px;
    height: 60px;
  }

  :deep(.not-found__cta .cubic-button__label) {
    font-size: 18px;
    line-height: normal;
    font-weight: $font-weight-bold;
    letter-spacing: #{tracking-in-percent(20)};
  }

  .not-found__snake {
    position: absolute;
    bottom: max(0px, env(safe-area-inset-bottom, 0px));
    left: 50%;
    z-index: 0;
    width: min(98.7dvw, 386px);
    height: auto;
    aspect-ratio: 386 / 396;
    opacity: 1;
    object-fit: contain;
    transform: translateX(-50%) scaleX(-1);
    transform-origin: center bottom;
  }
}
</style>
