import Cards from '@/services/Cards'
import { expect } from 'chai'

describe('services/Cards', () => {
  it('get', () => {
    const card = Cards.get('5-10A-12')

    expect(card).not.undefined
    expect(card?.id).to.eq('5-10A-12')
  })

  it('getAll', () => {
    expect(Cards.getAll().length).to.eq(1)
  })
})
