import ExpressionRange from './expression-range.js'
import ExpressionState from './expression-state.js'

export default class ExpressionQueue
{
    static createTransitions(expressionValues, expressionStates = [0])
    {
        return expressionValues <= 1 ? expressionStates : expressionValues & 1 ? expressionStates.concat(ExpressionQueue.createTransitions(expressionValues >> 1, expressionStates.concat(expressionStates))) : ExpressionQueue.createTransitions(expressionValues >> 1, expressionStates.concat(expressionStates))
    }

    constructor(expressionRules = [])
    {
        this.expressionRules = expressionRules
    }

    enqueue(expressionRule)
    {
        return this.expressionRules.push(expressionRule)
    }

    dequeue()
    {
        return this.expressionRules.shift()
    }

    generate()
    {
        const expressionStates = [new ExpressionState(this.expressionRules, ExpressionQueue.createTransitions(256))]

        for(const expressionState of expressionStates)
        {
            const expressionValues = expressionState.expressionRules.map(expressionRule => expressionRule.evaluate(new ExpressionRange(0, 255)))

            const expressionRanges = expressionValues.reduce(ExpressionRange.createIntersection)

            for(const expressionRange of expressionRanges)
            {
                const expressionRules = expressionState.expressionRules.map(expressionRule => expressionRule.derive(expressionRange))

                if(expressionStates.every(expressionState => ExpressionState.compareTo(expressionRules, expressionState.expressionRules)))
                {
                    expressionStates.push(new ExpressionState(expressionRules, ExpressionQueue.createTransitions(256)))
                }

                expressionState.setTransition(expressionRange, expressionStates.findIndex(expressionState => ExpressionState.equalTo(expressionRules, expressionState.expressionRules)))
            }
        }

        return expressionStates
    }
}
