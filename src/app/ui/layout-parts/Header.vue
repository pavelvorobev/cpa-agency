<script setup lang="ts">
import { useDisplayStore } from "@/common/store";
import { UiContainer, UiIcon, UiLink } from "@/common/ui";
import { computed, ref } from "vue";

interface NavigationLink {
  url: string
  text: string
}

const navigation: NavigationLink[] = [
  {url: '#team', text: 'Team'},
  {url: '#benefits', text: 'Benefits'},
  {url: '#join', text: 'Join Us'},
]

const isOpenMenu = ref<boolean>(false)
const display = useDisplayStore()
const isTabletOrMobile = computed(() => display.width <= 1280)

const openMenu = () => isOpenMenu.value = true
const closeMenu = () => isOpenMenu.value = false
</script>

<template>
  <header class="app-header">
    <div class="app-header__content container">
        <div class="app-header__logo">
          <UiIcon name="main-logo" width="22.5" height="20.58" />
        </div>
        <div class="app-header__main">
          <button v-if="isTabletOrMobile" class="app-header__menu-button ui-link navigation-link" @click="openMenu">menu</button>

          <template v-else>
            <nav class="app-header__nav">
                <ul>
                  <template v-for="link in navigation" :key="link.url">
                    <li><UiLink :href="link.url" class="navigation-link">{{ link.text }}</UiLink></li>
                  </template>
                </ul>
            </nav>
            <div class="app-header__lang">
                <UiLink href="#team">Eng</UiLink>
                <span class="ui-link">/</span>
                <UiLink href="#team">Рус</UiLink>
            </div>
          </template>
        </div>
    </div>
  </header>
  <Transition name="tr-menu">
    <div v-show="isOpenMenu" class="mobile-menu">
      <UiContainer>
        <div class="mobile-menu__header">
          <div class="mobile-menu__logo">
            <UiIcon name="main-logo" width="22" height="20" />
          </div>
          <button class="mobile-menu__close button-text-20" @click="closeMenu">
            X
          </button>
        </div>
        
        <nav class="mobile-menu__nav">
            <ul>
              <template v-for="link in navigation" :key="link.url">
                <li><UiLink :href="link.url" class="navigation-link">{{ link.text }}</UiLink></li>
              </template>
            </ul>
        </nav>
      </UiContainer>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.tr-menu-enter-active,
.tr-menu-leave-active {
  transition: transform .2s ease-out;
}

.tr-menu-enter-from,
.tr-menu-leave-to {
  transform: translateY(-105%);
}

.tr-menu-leave-from,
.tr-menu-enter-to {
  transform: translateY(0);
}

.navigation-link {
    padding: 5rem;
}

.app-header {
  padding-block: 5rem;

  &__logo {
    color: #{$color-white};
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__nav {
    ul {
        display: flex;
        align-items: center;
        list-style-position: inside;
        list-style-type: none;
        gap: 1.25rem;
    }
  }

  &__main {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  &__menu-button {
    background-color: transparent;
    border: none;
    font-size: #{$fs-16};
  }
}

.mobile-menu {
  position: fixed;
  height: 100dvh;
  width: 100%;
  max-width: 100dvw;
  // background-color: #{$color-primary};
  background-color: skyblue;
  padding: 0;
  inset: 0;
  will-change: transform;

  &__logo {
    color: #{$color-white};
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 8rem;
    max-width: 100%;
  }

  &__close {
    background-color: transparent;
    border: none;
    color: #{$color-yellow};
    padding: 4rem;
  }
}
</style>
