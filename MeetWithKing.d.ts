import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Action from '@civ-clone/core-unit/Action';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';
/** A Diplomat asks to meet `player()`'s leader. What follows is up to the `KingMet` rules. The Diplomat isn't used up. */
export declare class MeetWithKing extends Action {
  private _player;
  constructor(
    from: Tile,
    to: Tile,
    unit: Unit,
    player: Player,
    ruleRegistry?: RuleRegistry
  );
  player(): Player;
  forUnit(unit: Unit): Action;
  perform(): void;
}
export default MeetWithKing;
