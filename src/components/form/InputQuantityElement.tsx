"use client"

import { Controller, useFormContext } from 'react-hook-form';
import {Field, FieldContent, FieldGroup, FieldLabel, FieldDescription, FieldSet} from '@/components/ui/field';
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
    append: ({}) => void
}

const InputElement: React.FC<InputElementProps> = ({name, remove, append, ...props}) => {

        const form = useFormContext();

    return (
        <Card>
            <CardContent>
                <div className="flex flex-row justify-right items-center flex">
                    <FieldSet>
                    <Field>
                        <FieldLabel>From:</FieldLabel>
                        <Input {...form.register(`${name}.from`)}/>
                    </Field>
                    <Field>
                        <FieldLabel>To:</FieldLabel>
                        <Input {...form.register(`${name}.to`)}/>
                    </Field>
                    <Field>
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
                    </Field>
                    <Field>
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
                        <Field>
                            <center>
                                <Button variant="destructive" onClick={remove}>Delete</Button>
                                <Button variant="outline" onClick={() => append(
                                    {
                                        to: form.getValues(`${name}.from`),
                                        from: form.getValues(`${name}.to`),
                                        miles: form.getValues(`${name}.miles`),
                                        amount: form.getValues(`${name}.amount`)
                                    }
                                    )}>Round Trip
                                </Button>
                            </center>
                        </Field>
                    </FieldSet>
                </div>
            </CardContent>
        </Card>
    )
}

export default InputElement;