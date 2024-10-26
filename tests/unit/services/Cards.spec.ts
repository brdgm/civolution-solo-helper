import Cards from '@/services/Cards'
import { expect } from 'chai'

describe('services/Cards', () => {
  it('get', () => {
    const card = Cards.get(1)

    expect(card).to.not.undefined
    expect(card?.id).to.eq(1)
  })

  it('getAll', () => {
    expect(Cards.getAll().length).to.eq(15)
  })
})
