import { ref } from 'vue'

// Singleton-состояние: один и тот же ref используется и в колесе вкуса,
// и в меню, поэтому клик по вкусу мгновенно фильтрует карточки.
export const selectedFlavor = ref(null)

export function pickFlavor(name) {
  selectedFlavor.value = selectedFlavor.value === name ? null : name
}
