import CardDeck from '@/services/CardDeck'

export default function mockCardDeck(params?: MockCardDeckParams) : CardDeck {  
  return CardDeck.fromPersistence({
    pile: params?.pile ?? [],
    discard: params?.discard ?? []
  })
}

export interface MockCardDeckParams {
  pile?: number[]
  discard?: number[]
}
