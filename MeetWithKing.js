"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetWithKing = void 0;
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Action_1 = require("@civ-clone/core-unit/Action");
const KingMet_1 = require("./Rules/KingMet");
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
/** A Diplomat asks to meet `player()`'s leader. What follows is up to the `KingMet` rules. The Diplomat isn't used up. */
class MeetWithKing extends Action_1.default {
    constructor(from, to, unit, player, ruleRegistry = RuleRegistry_1.instance) {
        super(from, to, unit, ruleRegistry);
        this._player = player;
    }
    player() {
        return this._player;
    }
    // `Action.forUnit` rebuilds an action from `(from, to, unit, ruleRegistry)`, which would put the `RuleRegistry` where
    // the `Player` goes.
    // Typed as `Action`: a subclass with a member of its own isn't assignable to it (civ-clone/web-renderer#21).
    forUnit(unit) {
        return new MeetWithKing(this.from(), this.to(), unit, this._player, this.ruleRegistry());
    }
    perform() {
        this.ruleRegistry().process(KingMet_1.default, this.unit(), this._player);
        this.ruleRegistry().process(Moved_1.default, this.unit(), this);
    }
}
exports.MeetWithKing = MeetWithKing;
exports.default = MeetWithKing;
//# sourceMappingURL=MeetWithKing.js.map