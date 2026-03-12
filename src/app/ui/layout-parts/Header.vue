<script setup lang="ts">
import { UiLink } from "@/common/ui";
</script>

<template>
  <header class="app-header">
    <div class="app-header__content container">
        <div class="app-header__logo">Logo</div>
        <div class="app-header__main">
            <nav class="app-header__nav">
                <ul>
                    <li><UiLink href="#team" class="navigation-link">Team</UiLink></li>
                    <li><UiLink href="#benefits" class="navigation-link">Benefits</UiLink></li>
                    <li><UiLink href="#join" class="navigation-link">Join Us</UiLink></li>
                </ul>
            </nav>
            <div class="app-header__lang">
                <UiLink href="#team">Eng</UiLink>
                <span class="ui-link">/</span>
                <UiLink href="#team">Рус</UiLink>
            </div>
        </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.navigation-link {
    padding: 0.625rem;
}

.app-header {
  &__logo {
    width: 22.5rem;
    height: 20.58rem;
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
}
</style>
