import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Action from '@civ-clone/core-unit/Action';
import KingMet from './Rules/KingMet';
import Moved from '@civ-clone/core-unit/Rules/Moved';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';

/** A Diplomat asks to meet `player()`'s leader. What follows is up to the `KingMet` rules. The Diplomat isn't used up. */
export class MeetWithKing extends Action {
  private _player: Player;

  constructor(
    from: Tile,
    to: Tile,
    unit: Unit,
    player: Player,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super(from, to, unit, ruleRegistry);

    this._player = player;
  }

  player(): Player {
    return this._player;
  }

  // `Action.forUnit` rebuilds an action from `(from, to, unit, ruleRegistry)`, which would put the `RuleRegistry` where
  // the `Player` goes.
  // Typed as `Action`: a subclass with a member of its own isn't assignable to it (civ-clone/web-renderer#21).
  forUnit(unit: Unit): Action {
    return new MeetWithKing(
      this.from(),
      this.to(),
      unit,
      this._player,
      this.ruleRegistry()
    ) as unknown as Action;
  }

  perform(): void {
    this.ruleRegistry().process(KingMet, this.unit(), this._player);

    this.ruleRegistry().process(Moved, this.unit(), this as unknown as Action);
  }
}

export default MeetWithKing;
