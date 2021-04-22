import { reactive } from '@vue/composition-api'

export default function useFilter () {
  const filtering = reactive({
    text: ''
  })

  return {
    filtering
  }
}
