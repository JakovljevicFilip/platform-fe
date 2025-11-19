<template>
  <div>
    <div v-if="domainNoticesList.length">
      <template v-for="(dn, i) in domainNoticesList" :key="i">
        <template v-for="(n, j) in dn.notices" :key="j">
          <div :class="[noticeColors[n.style], 'text-white q-pa-md']">
            <div class="row items-center">
              <div class="col-auto flex flex-center">
                <q-icon :name="noticeIcons[n.style]" size="40px" />
              </div>
              <div class="col q-pl-md">
                <div class="text-subtitle1 text-weight-bold">
                  {{ n.title }}
                </div>
                <div class="text-body2 text-white text-opacity-80">
                  {{ n.subtitle }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useNoticesStore } from './notice-store'
  import { Style } from '../Domain/Notice'

  import { storeToRefs } from 'pinia'

  import { computed } from 'vue'

  const store = useNoticesStore()
  const { notices } = storeToRefs(store)

  const domainNoticesList = computed(() => notices.value.notices)

  const noticeColors: Record<Style, string> = {
    [Style.danger]: 'bg-negative',
    [Style.warning]: 'bg-warning',
    [Style.info]: 'bg-info',
  }

  const noticeIcons: Record<Style, string> = {
    [Style.danger]: 'warning',
    [Style.warning]: 'priority_high',
    [Style.info]: 'info',
  }
</script>
