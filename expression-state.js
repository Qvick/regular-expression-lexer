export default class ExpressionState
{
    static equalTo([leftExpression, ...leftExpressions], [rightExpression, ...rightExpressions])
    {
        return !leftExpression || !rightExpression ? !!leftExpression === !!rightExpression : leftExpression.equalTo(rightExpression) && ExpressionState.equalTo(leftExpressions, rightExpressions)
    }

    static compareTo([leftExpression, ...leftExpressions], [rightExpression, ...rightExpressions])
    {
        return !leftExpression || !rightExpression ? !!leftExpression - !!rightExpression : leftExpression.compareTo(rightExpression) || ExpressionState.compareTo(leftExpressions, rightExpressions)
    }

    constructor(expressionRules, expressionStates)
    {
        this.expressionRules = expressionRules

        this.expressionStates = expressionStates
    }

    isEmpty()
    {
        return this.expressionRules.every(expressionRule => expressionRule.isEmpty())
    }

    isNullable()
    {
        return this.expressionRules.some(expressionRule => expressionRule.isNullable())
    }

    findEmpty()
    {
        return this.expressionRules.findIndex(expressionRule => expressionRule.isEmpty())
    }

    findNullable()
    {
        return this.expressionRules.findIndex(expressionRule => expressionRule.isNullable())
    }

    setTransition(expressionValue, expressionState)
    {
        return this.expressionStates.fill(expressionState, expressionValue.leftExpression || expressionValue, expressionValue.rightExpression + 1 || expressionValue + 1)
    }

    deleteTransition(expressionValue)
    {
        return this.expressionStates.fill(0, expressionValue.leftExpression || expressionValue, expressionValue.rightExpression + 1 || expressionValue + 1)
    }

    getTransition(expressionValue)
    {
        return this.expressionStates.at(expressionValue)
    }

    hasTransition(expressionValue)
    {
        return !!this.expressionStates.at(expressionValue)
    }
}
