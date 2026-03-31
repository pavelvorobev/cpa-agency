<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { fetchTasks } from '../api/tasksApi'
import type { TaskSection } from '../types/tasks.types'
import { UiSection, UiContainer } from '@/common/ui'
import { SectionHeader } from '@/common/ui'

const sectionData = ref<TaskSection | null>(null)

onMounted(async () => {
  sectionData.value = await fetchTasks()
})

const highlightedDescription = computed(() => {
  if (!sectionData.value?.description) return ''
  const escaped = sectionData.value.description
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
  return escaped.replace(
    /in-house team/gi,
    '<span class="tasks-section__description-highlight">$&</span>',
  )
})
</script>
<template>
  <UiSection v-if="sectionData" class="tasks-section">
    <UiContainer>
      <div class="tasks-section__backdrop" aria-hidden="true" />
      <SectionHeader id="multi-tasks-section-title" class="tasks-section__title">
        MULTI-TASKS
      </SectionHeader>
      <div class="tasks-section__grid">
        <div class="tasks-section__description">
          <p class="tasks-section__description-text" v-html="highlightedDescription" />
          <img
            src="@/app/assets/images/landing/section-2.png"
            alt=""
            class="tasks-section__description-img"
          />
        </div>
        <ul v-if="sectionData?.tiles?.length" class="tasks-section__tiles">
          <li v-for="tile in sectionData?.tiles" :key="tile.title" class="tasks-section__tile">
            <h3 class="tasks-section__tile-title">{{ tile.title }}</h3>
            <p class="tasks-section__tile-text">{{ tile.text }}</p>
          </li>
        </ul>
      </div>
    </UiContainer>
  </UiSection>
</template>

<style lang="scss" scoped>
.tasks-section__backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(50% - 50vw);
  width: 100vw;
  max-width: 100vw;
  z-index: 0;
  pointer-events: none;
  box-sizing: border-box;
  background: rgba(#14091a, 0.9);
}

.tasks-section {
  background: transparent;
  position: relative;
  &__title {
    position: relative;
    z-index: 1;
    margin-bottom: 35rem;
    color: $color-yellow;
    text-align: right;
    text-transform: uppercase;

    @include text-style(20rem, 90%, 700, -0.04em);

    @media (max-height: 899px) {
      margin-bottom: 15rem;
    }
  }

  &__grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 12rem;

    @media (max-height: 899px) {
      gap: 10rem;
    }
  }

  &__description {
    display: flex;
    flex-direction: column;
    gap: 12.5rem;
    justify-content: space-between;
    width: 279.5rem;
    height: 304.5rem;
    background: linear-gradient(94deg, #220032 0%, #560080 55.77%, #9500dc 100%);
    border-radius: 8px;

    @media (max-height: 899px) {
      width: 253.5rem;
      height: 297rem;
    }
  }

  &__description-text {
    padding: 15rem 19rem 0 19rem;
    color: #fff;

    @include text-style(10rem, 120%, 700);

    @media (max-height: 899px) {
      padding: 26rem 10rem 0 10rem;
    }
  }

  &__description-text :deep(.tasks-section__description-highlight) {
    color: $color-yellow;
  }

  &__description-img {
    width: 100%;
  }

  &__tiles {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(6, 1fr);
    gap: 12rem;
    height: 304.5rem;
    list-style: none;
    margin: 0;
    padding: 0;

    @media (max-height: 899px) {
      gap: 10rem;
      height: 297rem;
    }
  }

  &__tile {
    display: flex;
    flex-direction: column;
    gap: 5rem;
    background-color: $color-primary;
    padding: 10rem;
    border-radius: 4rem;

    &:nth-child(1) {
      grid-column: 1;
      grid-row: 1 / 4;
    }

    &:nth-child(2) {
      grid-column: 1;
      grid-row: 4 / 7;
    }

    &:nth-child(3) {
      grid-column: 2;
      grid-row: 1 / 3;
    }

    &:nth-child(4) {
      grid-column: 2;
      grid-row: 3 / 5;
    }

    &:nth-child(5) {
      grid-column: 2;
      grid-row: 5 / 7;
    }
  }

  &__tile-title {
    color: $color-yellow;
    text-transform: uppercase;

    @include text-style(14rem, 100%, 700);
  }

  &__tile-text {
    color: rgba($color-white, 0.7);

    @include text-style(10rem, 120%, 400);
  }
}

.tasks-section__tile:hover .tasks-section__tile-text {
  color: rgba($color-white, 1);
}
</style>
