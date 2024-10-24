import { shuffle } from 'lodash'
import Card from './Card'
import Cards from './Cards'
import { CardDeckPersistence } from '@/store/state'
import { ref } from 'vue'

/**
 * Manages the solo card deck.
 */
export default class CardDeck {

  private readonly _pile
  private readonly _discard

  private constructor(pile : Card[], discard : Card[]) {
    this._pile = ref(pile)
    this._discard = ref(discard)
  }

  public get currentCard() : Card|undefined {
    return this._discard.value[0]
  }

  public get pile() : readonly Card[] {
    return this._pile.value
  }

  public get discard() : readonly Card[] {
    return this._discard.value
  }

  /**
   * Draws next card.
   * If not sufficient cards are left, the discard pile is shuffled back into the pile.
   * @returns Next action card
   */
  public draw() : Card {
    if (this._pile.value.length === 0) {
      this._pile.value = shuffle(this._discard.value)
      this._discard.value = []
    }
    const card = this._pile.value.shift()
    if (!card) {
      throw new Error('Pile is empty.')
    }
    this._discard.value.unshift(card)
    return card
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    return {
      pile: this._pile.value.map(card => card.id),
      discard: this._discard.value.map(card => card.id),
    }
  }

  /**
   * Creates a shuffled new card deck.
   * @param difficultyLevel DifficultyLevel
   */
  public static new() : CardDeck {
    const cards = shuffle(Cards.getAll())
    return new CardDeck(cards, [])
  }

  /**
   * Re-creates card deck from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence) : CardDeck {
    return new CardDeck(
      persistence.pile.map(Cards.get),
      persistence.discard.map(Cards.get)
    )
  }

}
