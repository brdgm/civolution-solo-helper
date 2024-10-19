import CardDeck from '@/services/CardDeck'

export default function (params?: MockCardDeckParams) : CardDeck {  
  return CardDeck.fromPersistence({
    pile: params?.pile ?? [],
    discard: params?.discard ?? []
  })
}

export interface MockCardDeckParams {
  pile?: string[]
  discard?: string[]
}
