import { mount } from '@vue/test-utils'
import SubscribeModal from '../../src/components/SubscribeModal'

test('validate subscribe modal empty fields', async () => {
  const wrapper = mount(SubscribeModal)
  const nameInput = wrapper.find('#name')
  const emailInput = wrapper.find('#email')
  const subscribeButton = wrapper.find('.subscribe-modal__subscribe-button')
  await nameInput.setValue('')
  await emailInput.setValue('')
  await subscribeButton.trigger('click')
  expect(nameInput.classes()).toContain('subscribe-modal__input_not-valid')
  expect(emailInput.classes()).toContain('subscribe-modal__input_not-valid')
})
