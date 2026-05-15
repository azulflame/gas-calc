"use client"

import { Controller, useFormContext } from 'react-hook-form';
import {Field, FieldContent, FieldGroup, FieldLabel, FieldDescription} from '@/components/ui/field';
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';

interface InputElementProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    placeholder?: string;
    description?: string;
    isOptional?: boolean;
    inputClassName?: string;
    outputClassName?: string;
    remove?: () => void
}

const InputElement: React.FC<InputElementProps> = ({name, remove, ...props}) => {

        const form = useFormContext();

    return (
        <Card>
            <CardContent>
                <div className="flex flex-row justify-right items-center flex">
                    <Field>
                        <FieldLabel>From:</FieldLabel>
                        <Input {...form.register(`${name}.from`)}/>
                        <FieldLabel>To:</FieldLabel>
                        <Input {...form.register(`${name}.to`)}/>
                        <FieldLabel>Miles:</FieldLabel>
                        <Controller
                            name={`${name}.miles`}
                            control={form.control}
                            render={({field, fieldState}) => (
                            <Input
                                {...form.register(`${name}.miles`)}
                                {...field}
                                type="number"
                                aria-invalid={fieldState.invalid}
                            />
                            )}
                        />
                        <FieldLabel>Trip Count</FieldLabel>
                        <Controller
                            name={`${name}.amount`}
                            control={form.control}
                            render={({field, fieldState}) => (
                            <Input
                                {...form.register(`${name}.amount`)}
                                {...field}
                                type="number"
                                aria-invalid={fieldState.invalid}
                            />
                            )}
                        />
                    </Field>
                    <Button onClick={remove}>X</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default InputElement;