import { map } from 'nanostores'

export const $component = map({
  type: 'histogram'
})

// Consider store of bound objects
// dependency graph of store objects that are alterered by an action
// Ex: when a user updates a slider then slider value is updated but also we need to update result