import ExpressionRange from './expression-range.js'
import ExpressionType from './expression-type.js'

export default class Expression
{
    static createAlternation(leftExpression, rightExpression)
    {
        if(leftExpression.expressionType === ExpressionType.alternationLexer && rightExpression.expressionType === ExpressionType.alternationLexer)
        {
            const expressionValue = leftExpression.leftExpression.compareTo(rightExpression.leftExpression)

            if(expressionValue < 0)
            {
                return Expression.createAlternationLexer(leftExpression.leftExpression, Expression.createAlternation(rightExpression.leftExpression, Expression.createAlternation(leftExpression.rightExpression, rightExpression.rightExpression)))
            }

            if(expressionValue > 0)
            {
                return Expression.createAlternationLexer(rightExpression.leftExpression, Expression.createAlternation(leftExpression.leftExpression, Expression.createAlternation(leftExpression.rightExpression, rightExpression.rightExpression)))
            }

            return Expression.createAlternationLexer(leftExpression.leftExpression, Expression.createAlternation(leftExpression.rightExpression, rightExpression.rightExpression))
        }

        if(leftExpression.expressionType === ExpressionType.alternationLexer && rightExpression.expressionType !== ExpressionType.alternationLexer)
        {
            const expressionValue = leftExpression.leftExpression.compareTo(rightExpression)

            if(expressionValue < 0)
            {
                return Expression.createAlternationLexer(leftExpression.leftExpression, Expression.createAlternation(rightExpression, leftExpression.rightExpression))
            }

            if(expressionValue > 0)
            {
                return Expression.createAlternationLexer(rightExpression, Expression.createAlternation(leftExpression.leftExpression, leftExpression.rightExpression))
            }

            return Expression.createAlternationLexer(leftExpression.leftExpression, leftExpression.rightExpression)
        }

        if(leftExpression.expressionType !== ExpressionType.alternationLexer && rightExpression.expressionType === ExpressionType.alternationLexer)
        {
            const expressionValue = rightExpression.leftExpression.compareTo(leftExpression)

            if(expressionValue < 0)
            {
                return Expression.createAlternationLexer(rightExpression.leftExpression, Expression.createAlternation(leftExpression, rightExpression.rightExpression))
            }

            if(expressionValue > 0)
            {
                return Expression.createAlternationLexer(leftExpression, Expression.createAlternation(rightExpression.leftExpression, rightExpression.rightExpression))
            }

            return Expression.createAlternationLexer(rightExpression.leftExpression, rightExpression.rightExpression)
        }

        const expressionValue = rightExpression.compareTo(leftExpression)

        if(expressionValue < 0)
        {
            return Expression.createAlternationLexer(rightExpression, leftExpression)
        }

        if(expressionValue > 0)
        {
            return Expression.createAlternationLexer(leftExpression, rightExpression)
        }

        return rightExpression
    }

    static createIntersection(leftExpression, rightExpression)
    {
        if(leftExpression.expressionType === ExpressionType.intersectionLexer && rightExpression.expressionType === ExpressionType.intersectionLexer)
        {
            const expressionValue = leftExpression.leftExpression.compareTo(rightExpression.leftExpression)

            if(expressionValue < 0)
            {
                return Expression.createIntersectionLexer(leftExpression.leftExpression, Expression.createIntersection(rightExpression.leftExpression, Expression.createIntersection(leftExpression.rightExpression, rightExpression.rightExpression)))
            }

            if(expressionValue > 0)
            {
                return Expression.createIntersectionLexer(rightExpression.leftExpression, Expression.createIntersection(leftExpression.leftExpression, Expression.createIntersection(leftExpression.rightExpression, rightExpression.rightExpression)))
            }

            return Expression.createIntersectionLexer(leftExpression.leftExpression, Expression.createIntersection(leftExpression.rightExpression, rightExpression.rightExpression))
        }

        if(leftExpression.expressionType === ExpressionType.intersectionLexer && rightExpression.expressionType !== ExpressionType.intersectionLexer)
        {
            const expressionValue = leftExpression.leftExpression.compareTo(rightExpression)

            if(expressionValue < 0)
            {
                return Expression.createIntersectionLexer(leftExpression.leftExpression, Expression.createIntersection(rightExpression, leftExpression.rightExpression))
            }

            if(expressionValue > 0)
            {
                return Expression.createIntersectionLexer(rightExpression, Expression.createIntersection(leftExpression.leftExpression, leftExpression.rightExpression))
            }

            return Expression.createIntersectionLexer(leftExpression.leftExpression, leftExpression.rightExpression)
        }

        if(leftExpression.expressionType !== ExpressionType.intersectionLexer && rightExpression.expressionType === ExpressionType.intersectionLexer)
        {
            const expressionValue = rightExpression.leftExpression.compareTo(leftExpression)

            if(expressionValue < 0)
            {
                return Expression.createIntersectionLexer(rightExpression.leftExpression, Expression.createIntersection(leftExpression, rightExpression.rightExpression))
            }

            if(expressionValue > 0)
            {
                return Expression.createIntersectionLexer(leftExpression, Expression.createIntersection(rightExpression.leftExpression, rightExpression.rightExpression))
            }

            return Expression.createIntersectionLexer(rightExpression.leftExpression, rightExpression.rightExpression)
        }

        const expressionValue = rightExpression.compareTo(leftExpression)

        if(expressionValue < 0)
        {
            return Expression.createIntersectionLexer(rightExpression, leftExpression)
        }

        if(expressionValue > 0)
        {
            return Expression.createIntersectionLexer(leftExpression, rightExpression)
        }

        return rightExpression
    }

    static createConcatenation(leftExpression, rightExpression)
    {
        if(leftExpression.expressionType === ExpressionType.concatenationLexer && rightExpression.expressionType === ExpressionType.concatenationLexer)
        {
            return Expression.createConcatenationLexer(leftExpression.leftExpression, Expression.createConcatenation(leftExpression.rightExpression, rightExpression))
        }

        if(leftExpression.expressionType === ExpressionType.concatenationLexer && rightExpression.expressionType !== ExpressionType.concatenationLexer)
        {
            return Expression.createConcatenationLexer(leftExpression.leftExpression, Expression.createConcatenation(leftExpression.rightExpression, rightExpression))
        }

        return Expression.createConcatenationLexer(leftExpression, rightExpression)
    }

    static createQuantification(leftExpression)
    {
        if(leftExpression.expressionType === ExpressionType.terminationLexer)
        {
            return Expression.createDerivationLexer()
        }

        if(leftExpression.expressionType === ExpressionType.derivationLexer)
        {
            return Expression.createDerivationLexer()
        }

        if(leftExpression.expressionType === ExpressionType.substitutionLexer)
        {
            return Expression.createRepresentationLexer()
        }

        if(leftExpression.expressionType === ExpressionType.representationLexer)
        {
            return Expression.createRepresentationLexer()
        }

        return Expression.createQuantificationLexer(leftExpression)
    }

    static createComplementation(leftExpression)
    {
        if(leftExpression.expressionType === ExpressionType.terminationLexer)
        {
            return Expression.createRepresentationLexer()
        }

        if(leftExpression.expressionType === ExpressionType.representationLexer)
        {
            return Expression.createTerminationLexer()
        }

        return Expression.createComplementationLexer(leftExpression)
    }

    static createInterpretation(leftExpression)
    {
        return Expression.createInterpretationLexer(leftExpression)
    }

    static createRepresentation()
    {
        return Expression.createRepresentationLexer()
    }

    static createSubstitution()
    {
        return Expression.createSubstitutionLexer()
    }

    static createDerivation()
    {
        return Expression.createDerivationLexer()
    }

    static createTermination()
    {
        return Expression.createTerminationLexer()
    }

    static createAlternationLexer(leftExpression, rightExpression)
    {
        if(leftExpression.expressionType === ExpressionType.terminationLexer && rightExpression.expressionType === ExpressionType.terminationLexer)
        {
            return new Expression(leftExpression.expressionType, leftExpression.leftExpression, leftExpression.rightExpression)
        }

        if(leftExpression.expressionType === ExpressionType.terminationLexer && rightExpression.expressionType !== ExpressionType.terminationLexer)
        {
            return new Expression(rightExpression.expressionType, rightExpression.leftExpression, rightExpression.rightExpression)
        }

        if(leftExpression.expressionType !== ExpressionType.terminationLexer && rightExpression.expressionType === ExpressionType.terminationLexer)
        {
            return new Expression(leftExpression.expressionType, leftExpression.leftExpression, leftExpression.rightExpression)
        }

        if(leftExpression.expressionType === ExpressionType.representationLexer && rightExpression.expressionType === ExpressionType.representationLexer)
        {
            return new Expression(rightExpression.expressionType, rightExpression.leftExpression, rightExpression.rightExpression)
        }

        if(leftExpression.expressionType === ExpressionType.representationLexer && rightExpression.expressionType !== ExpressionType.representationLexer)
        {
            return new Expression(leftExpression.expressionType, leftExpression.leftExpression, leftExpression.rightExpression)
        }

        if(leftExpression.expressionType !== ExpressionType.representationLexer && rightExpression.expressionType === ExpressionType.representationLexer)
        {
            return new Expression(rightExpression.expressionType, rightExpression.leftExpression, rightExpression.rightExpression)
        }

        return new Expression(ExpressionType.alternationLexer, leftExpression, rightExpression)
    }

    static createIntersectionLexer(leftExpression, rightExpression)
    {
        if(leftExpression.expressionType === ExpressionType.terminationLexer && rightExpression.expressionType === ExpressionType.terminationLexer)
        {
            return new Expression(rightExpression.expressionType, rightExpression.leftExpression, rightExpression.rightExpression)
        }

        if(leftExpression.expressionType === ExpressionType.terminationLexer && rightExpression.expressionType !== ExpressionType.terminationLexer)
        {
            return new Expression(leftExpression.expressionType, leftExpression.leftExpression, leftExpression.rightExpression)
        }

        if(leftExpression.expressionType !== ExpressionType.terminationLexer && rightExpression.expressionType === ExpressionType.terminationLexer)
        {
            return new Expression(rightExpression.expressionType, rightExpression.leftExpression, rightExpression.rightExpression)
        }

        if(leftExpression.expressionType === ExpressionType.representationLexer && rightExpression.expressionType === ExpressionType.representationLexer)
        {
            return new Expression(leftExpression.expressionType, leftExpression.leftExpression, leftExpression.rightExpression)
        }

        if(leftExpression.expressionType === ExpressionType.representationLexer && rightExpression.expressionType !== ExpressionType.representationLexer)
        {
            return new Expression(rightExpression.expressionType, rightExpression.leftExpression, rightExpression.rightExpression)
        }

        if(leftExpression.expressionType !== ExpressionType.representationLexer && rightExpression.expressionType === ExpressionType.representationLexer)
        {
            return new Expression(leftExpression.expressionType, leftExpression.leftExpression, leftExpression.rightExpression)
        }

        return new Expression(ExpressionType.intersectionLexer, leftExpression, rightExpression)
    }

    static createConcatenationLexer(leftExpression, rightExpression)
    {
        if(leftExpression.expressionType === ExpressionType.terminationLexer && rightExpression.expressionType === ExpressionType.terminationLexer)
        {
            return new Expression(rightExpression.expressionType, rightExpression.leftExpression, rightExpression.rightExpression)
        }

        if(leftExpression.expressionType === ExpressionType.terminationLexer && rightExpression.expressionType !== ExpressionType.terminationLexer)
        {
            return new Expression(leftExpression.expressionType, leftExpression.leftExpression, leftExpression.rightExpression)
        }

        if(leftExpression.expressionType !== ExpressionType.terminationLexer && rightExpression.expressionType === ExpressionType.terminationLexer)
        {
            return new Expression(rightExpression.expressionType, rightExpression.leftExpression, rightExpression.rightExpression)
        }

        if(leftExpression.expressionType === ExpressionType.derivationLexer && rightExpression.expressionType === ExpressionType.derivationLexer)
        {
            return new Expression(leftExpression.expressionType, leftExpression.leftExpression, leftExpression.rightExpression)
        }

        if(leftExpression.expressionType === ExpressionType.derivationLexer && rightExpression.expressionType !== ExpressionType.derivationLexer)
        {
            return new Expression(rightExpression.expressionType, rightExpression.leftExpression, rightExpression.rightExpression)
        }

        if(leftExpression.expressionType !== ExpressionType.derivationLexer && rightExpression.expressionType === ExpressionType.derivationLexer)
        {
            return new Expression(leftExpression.expressionType, leftExpression.leftExpression, leftExpression.rightExpression)
        }

        return new Expression(ExpressionType.concatenationLexer, leftExpression, rightExpression)
    }

    static createQuantificationLexer(leftExpression)
    {
        if(leftExpression.expressionType === ExpressionType.quantificationLexer)
        {
            return new Expression(leftExpression.expressionType, leftExpression.leftExpression, leftExpression.rightExpression)
        }

        return new Expression(ExpressionType.quantificationLexer, leftExpression)
    }

    static createComplementationLexer(leftExpression)
    {
        if(leftExpression.expressionType === ExpressionType.complementationLexer)
        {
            return new Expression(leftExpression.leftExpression.expressionType, leftExpression.leftExpression.leftExpression, leftExpression.leftExpression.rightExpression)
        }

        return new Expression(ExpressionType.complementationLexer, leftExpression)
    }

    static createInterpretationLexer(leftExpression)
    {
        return new Expression(ExpressionType.interpretationLexer, leftExpression)
    }

    static createRepresentationLexer()
    {
        return new Expression(ExpressionType.representationLexer)
    }

    static createSubstitutionLexer()
    {
        return new Expression(ExpressionType.substitutionLexer)
    }

    static createDerivationLexer()
    {
        return new Expression(ExpressionType.derivationLexer)
    }

    static createTerminationLexer()
    {
        return new Expression(ExpressionType.terminationLexer)
    }

    constructor(expressionType, leftExpression, rightExpression)
    {
        this.expressionType = expressionType

        this.leftExpression = leftExpression

        this.rightExpression = rightExpression
    }

    isEmpty()
    {
        if(this.expressionType === ExpressionType.alternationLexer)
        {
            return this.leftExpression.isEmpty() && this.rightExpression.isEmpty()
        }

        if(this.expressionType === ExpressionType.intersectionLexer)
        {
            return this.leftExpression.isEmpty() || this.rightExpression.isEmpty()
        }

        if(this.expressionType === ExpressionType.concatenationLexer)
        {
            return this.leftExpression.isEmpty() || this.rightExpression.isEmpty()
        }

        if(this.expressionType === ExpressionType.complementationLexer)
        {
            return this.leftExpression.isEmpty()
        }

        return this.expressionType.isEmpty()
    }

    isNullable()
    {
        if(this.expressionType === ExpressionType.alternationLexer)
        {
            return this.leftExpression.isNullable() || this.rightExpression.isNullable()
        }

        if(this.expressionType === ExpressionType.intersectionLexer)
        {
            return this.leftExpression.isNullable() && this.rightExpression.isNullable()
        }

        if(this.expressionType === ExpressionType.concatenationLexer)
        {
            return this.leftExpression.isNullable() && this.rightExpression.isNullable()
        }

        if(this.expressionType === ExpressionType.complementationLexer)
        {
            return !this.leftExpression.isNullable()
        }

        return this.expressionType.isNullable()
    }

    equalTo(expression)
    {
        if(this.expressionType === ExpressionType.alternationLexer && expression.expressionType === ExpressionType.alternationLexer)
        {
            return this.leftExpression.equalTo(expression.leftExpression) && this.rightExpression.equalTo(expression.rightExpression)
        }

        if(this.expressionType === ExpressionType.intersectionLexer && expression.expressionType === ExpressionType.intersectionLexer)
        {
            return this.leftExpression.equalTo(expression.leftExpression) && this.rightExpression.equalTo(expression.rightExpression)
        }

        if(this.expressionType === ExpressionType.concatenationLexer && expression.expressionType === ExpressionType.concatenationLexer)
        {
            return this.leftExpression.equalTo(expression.leftExpression) && this.rightExpression.equalTo(expression.rightExpression)
        }

        if(this.expressionType === ExpressionType.quantificationLexer && expression.expressionType === ExpressionType.quantificationLexer)
        {
            return this.leftExpression.equalTo(expression.leftExpression)
        }

        if(this.expressionType === ExpressionType.complementationLexer && expression.expressionType === ExpressionType.complementationLexer)
        {
            return this.leftExpression.equalTo(expression.leftExpression)
        }

        if(this.expressionType === ExpressionType.interpretationLexer && expression.expressionType === ExpressionType.interpretationLexer)
        {
            return this.leftExpression.equalTo(expression.leftExpression)
        }

        return this.expressionType.equalTo(expression.expressionType)
    }

    compareTo(expression)
    {
        if(this.expressionType === ExpressionType.alternationLexer && expression.expressionType === ExpressionType.alternationLexer)
        {
            return this.leftExpression.compareTo(expression.leftExpression) || this.rightExpression.compareTo(expression.rightExpression)
        }

        if(this.expressionType === ExpressionType.intersectionLexer && expression.expressionType === ExpressionType.intersectionLexer)
        {
            return this.leftExpression.compareTo(expression.leftExpression) || this.rightExpression.compareTo(expression.rightExpression)
        }

        if(this.expressionType === ExpressionType.concatenationLexer && expression.expressionType === ExpressionType.concatenationLexer)
        {
            return this.leftExpression.compareTo(expression.leftExpression) || this.rightExpression.compareTo(expression.rightExpression)
        }

        if(this.expressionType === ExpressionType.quantificationLexer && expression.expressionType === ExpressionType.quantificationLexer)
        {
            return this.leftExpression.compareTo(expression.leftExpression)
        }

        if(this.expressionType === ExpressionType.complementationLexer && expression.expressionType === ExpressionType.complementationLexer)
        {
            return this.leftExpression.compareTo(expression.leftExpression)
        }

        if(this.expressionType === ExpressionType.interpretationLexer && expression.expressionType === ExpressionType.interpretationLexer)
        {
            return this.leftExpression.compareTo(expression.leftExpression)
        }

        return this.expressionType.compareTo(expression.expressionType)
    }

    derive(expressionRange)
    {
        if(this.expressionType === ExpressionType.alternationLexer)
        {
            return Expression.createAlternation(this.leftExpression.derive(expressionRange), this.rightExpression.derive(expressionRange))
        }

        if(this.expressionType === ExpressionType.intersectionLexer)
        {
            return Expression.createIntersection(this.leftExpression.derive(expressionRange), this.rightExpression.derive(expressionRange))
        }

        if(this.expressionType === ExpressionType.concatenationLexer)
        {
            if(this.leftExpression.isNullable())
            {
                return Expression.createAlternation(this.rightExpression.derive(expressionRange), Expression.createConcatenationLexer(this.leftExpression.derive(expressionRange), this.rightExpression))
            }
            else
            {
                return Expression.createConcatenation(this.leftExpression.derive(expressionRange), this.rightExpression)
            }
        }

        if(this.expressionType === ExpressionType.quantificationLexer)
        {
            return Expression.createConcatenation(this.leftExpression.derive(expressionRange), Expression.createQuantification(this.leftExpression))
        }

        if(this.expressionType === ExpressionType.complementationLexer)
        {
            return Expression.createComplementation(this.leftExpression.derive(expressionRange))
        }

        if(this.expressionType === ExpressionType.interpretationLexer)
        {
            if(this.leftExpression.overlapsWith(expressionRange))
            {
                return Expression.createDerivation()
            }
            else
            {
                return Expression.createTermination()
            }
        }

        if(this.expressionType === ExpressionType.representationLexer)
        {
            return Expression.createRepresentation()
        }

        if(this.expressionType === ExpressionType.substitutionLexer)
        {
            return Expression.createDerivation()
        }

        return Expression.createTermination()
    }

    evaluate(expressionRange)
    {
        if(this.expressionType === ExpressionType.alternationLexer)
        {
            return ExpressionRange.createIntersection(this.leftExpression.evaluate(expressionRange), this.rightExpression.evaluate(expressionRange))
        }

        if(this.expressionType === ExpressionType.intersectionLexer)
        {
            return ExpressionRange.createIntersection(this.leftExpression.evaluate(expressionRange), this.rightExpression.evaluate(expressionRange))
        }

        if(this.expressionType === ExpressionType.concatenationLexer)
        {
            if(this.leftExpression.isNullable())
            {
                return ExpressionRange.createIntersection(this.leftExpression.evaluate(expressionRange), this.rightExpression.evaluate(expressionRange))
            }
            else
            {
                return ExpressionRange.createAlternation(this.leftExpression.evaluate(expressionRange))
            }
        }

        if(this.expressionType === ExpressionType.quantificationLexer)
        {
            return ExpressionRange.createAlternation(this.leftExpression.evaluate(expressionRange))
        }

        if(this.expressionType === ExpressionType.complementationLexer)
        {
            return ExpressionRange.createAlternation(this.leftExpression.evaluate(expressionRange))
        }

        if(this.expressionType === ExpressionType.interpretationLexer)
        {
            return ExpressionRange.createAlternation(this.leftExpression.evaluate(expressionRange))
        }

        return ExpressionRange.createAlternation(expressionRange.evaluate(expressionRange))
    }
}
