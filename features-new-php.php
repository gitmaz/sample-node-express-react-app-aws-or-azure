<?php


/*Union Types:

PHP 8.0 introduced union types, allowing developers to specify that a variable can accept values of multiple types. This enhances type flexibility and improves code readability.
php
*/
function myFunction(int|float $number): string {
    // Function implementation
}
/*Named Arguments:

Named arguments allow you to pass values to a function by specifying the parameter name, making the code more readable and reducing the reliance on the order of arguments.
php
*/
function myFunction($param1, $param2, $param3) {
    // Function implementation
}

myFunction(param2: 'value2', param1: 'value1', param3: 'value3');
Match Expression:

/*The match expression is a more powerful and concise replacement for the traditional switch statement, making it easier to handle complex conditional logic.
php
*/
$result = match ($value) {
    1, 2 => 'One or Two',
    3, 4 => 'Three or Four',
    default => 'Other',
};
/*Nullsafe Operator:

The nullsafe operator (?->) allows developers to safely access properties or methods of an object without explicitly checking for null.
                                                                                                                                  php
      */                                                                                                                            
$result = $object?->getProperty()?->getNestedValue() ?? 'default';
/*Attributes:

Attributes provide a way to add metadata to classes, methods, properties, parameters, and more. They offer a standardized and more declarative approach compared to comments or annotations.
php
*/
#[MyAttribute]
class MyClass {
    #[MyAttribute]
    public $myProperty;

    #[MyAttribute]
    public function myMethod(#[MyAttribute] $param) {
        // Method implementation
    }
}