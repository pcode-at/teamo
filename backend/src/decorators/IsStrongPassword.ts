import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsStrongPasswordConstraint implements ValidatorConstraintInterface {
    async validate(password: string, args: ValidationArguments) {
        return password.length >= 8;
    }

    public defaultMessage(args: ValidationArguments) {
        return `given password is not strong enough`;
    }
}

export function IsStrongPassword(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsStrongPasswordConstraint,
        });
    };
}