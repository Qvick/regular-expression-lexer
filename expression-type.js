export default class ExpressionType
{
    static alternationLexer = new ExpressionType(0)

    static intersectionLexer = new ExpressionType(1)

    static concatenationLexer = new ExpressionType(2)

    static quantificationLexer = new ExpressionType(3)

    static complementationLexer = new ExpressionType(4)

    static interpretationLexer = new ExpressionType(5)

    static representationLexer = new ExpressionType(6)

    static substitutionLexer = new ExpressionType(7)

    static derivationLexer = new ExpressionType(8)

    static terminationLexer = new ExpressionType(9)

    constructor(expressionValue)
    {
        this.expressionValue = expressionValue
    }

    isEmpty()
    {
        return this.expressionValue === ExpressionType.terminationLexer.expressionValue
    }

    isNullable()
    {
        return this.expressionValue === ExpressionType.derivationLexer.expressionValue ||
               this.expressionValue === ExpressionType.quantificationLexer.expressionValue ||
               this.expressionValue === ExpressionType.representationLexer.expressionValue
    }

    equalTo(expressionType)
    {
        return this.expressionValue === expressionType.expressionValue
    }

    compareTo(expressionType)
    {
        return this.expressionValue - expressionType.expressionValue
    }
}
