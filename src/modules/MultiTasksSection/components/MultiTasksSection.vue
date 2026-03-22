<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { fetchTasks } from '../api/tasksApi'
import type { ITasksSection } from '../types/tasks.types'
import { UiSection, UiContainer } from '@/common/ui'

const sectionData = ref<ITasksSection | null>(null)

onMounted(async () => {
  sectionData.value = await fetchTasks()
})

interface IDescriptionSegment {
  text: string
  highlighted: boolean
}

const descriptionSegments = computed<IDescriptionSegment[]>(() => {
  const description = sectionData.value?.description
  if (!description) return []

  const segments: IDescriptionSegment[] = []
  const pattern = /in-house team/gi
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(description)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: description.slice(lastIndex, match.index), highlighted: false })
    }
    segments.push({ text: match[0], highlighted: true })
    lastIndex = pattern.lastIndex
    if (pattern.lastIndex === match.index) pattern.lastIndex++
  }

  if (lastIndex < description.length) {
    segments.push({ text: description.slice(lastIndex), highlighted: false })
  }

  return segments
})
</script>
<template>
  <UiSection v-if="sectionData" class="tasks-section">
    <UiContainer>
      <h2 class="tasks-section__title">MULTI-TASKS</h2>
      <div class="tasks-section__grid">
        <div class="tasks-section__description">
          <p class="tasks-section__description-text">
            <template v-for="(segment, index) in descriptionSegments" :key="`${index}-${segment.text}`">
              <span
                v-if="segment.highlighted"
                class="tasks-section__description-highlight"
              >{{ segment.text }}</span>
              <template v-else>{{ segment.text }}</template>
            </template>
          </p>
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
.tasks-section {
  background-color: $color-dark;

  &__title {
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

  &__description-highlight {
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
