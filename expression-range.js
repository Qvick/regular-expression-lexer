export default class ExpressionRange
{
    static createIntersection(leftExpressions, rightExpressions)
    {
        return leftExpressions.flatMap(leftExpression => rightExpressions.flatMap(rightExpression => leftExpression.leftExpression > rightExpression.rightExpression || leftExpression.rightExpression < rightExpression.leftExpression ? [] : [new ExpressionRange(leftExpression.leftExpression < rightExpression.leftExpression ? rightExpression.leftExpression : leftExpression.leftExpression, leftExpression.rightExpression > rightExpression.rightExpression ? rightExpression.rightExpression : leftExpression.rightExpression)]))
    }

    static createAlternation(leftExpressions)
    {
        return leftExpressions.flatMap(leftExpression => leftExpression.leftExpression > leftExpression.rightExpression ? [] : [new ExpressionRange(leftExpression.leftExpression, leftExpression.rightExpression)])
    }

    constructor(leftExpression, rightExpression)
    {
        this.leftExpression = leftExpression

        this.rightExpression = rightExpression
    }

    equalTo(expressionRange)
    {
        return this.leftExpression === expressionRange.leftExpression && this.rightExpression === expressionRange.rightExpression
    }

    compareTo(expressionRange)
    {
        return this.leftExpression - expressionRange.leftExpression || this.rightExpression - expressionRange.rightExpression
    }

    overlapsWith(expressionRange)
    {
        return this.leftExpression <= expressionRange.rightExpression && this.rightExpression >= expressionRange.leftExpression
    }

    intersectsWith(expressionRange)
    {
        return this.leftExpression <= expressionRange.leftExpression && this.rightExpression >= expressionRange.rightExpression
    }

    evaluate(expressionRange)
    {
        return [new ExpressionRange(expressionRange.leftExpression, this.leftExpression - 1), new ExpressionRange(this.leftExpression, this.rightExpression), new ExpressionRange(this.rightExpression + 1, expressionRange.rightExpression)]
    }
}
