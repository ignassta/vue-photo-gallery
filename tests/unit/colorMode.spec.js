import { mount } from '@vue/test-utils'
import NavigationBar from '../../src/components/NavigationBar'

test('change color mode', async () => {
  const wrapper = mount(NavigationBar, {
    data () {
      return {
        lightMode: false
      }
    }
  })
  const button = wrapper.find('.navigation-bar__color-mode-button')
  await button.trigger('click')
  expect(wrapper.vm.lightMode).toBe(true)
})
